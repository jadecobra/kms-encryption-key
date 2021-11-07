import {
  ArnPrincipal,
  CompositePrincipal,
  PolicyDocument,
  PolicyStatement,
} from '@aws-cdk/aws-iam';
import { Key, IKey } from '@aws-cdk/aws-kms';
import { Construct, RemovalPolicy, Tags } from '@aws-cdk/core';

export interface IKmsEncryptionKeyProps {
  readonly keyName: string;
  readonly administratorRoleArns?: string[];
  readonly environmentName?: string;
  readonly description?: string;
}

const getArnPrincipals = (administratorRoleArns: string[]): ArnPrincipal[] => {
  return administratorRoleArns.map((arn) => new ArnPrincipal(arn));
};

const getAdministratorArns = (
  administratorRoleArns: string[],
): CompositePrincipal[] => {
  return [new CompositePrincipal(...getArnPrincipals(administratorRoleArns))];
};

const createKeyPolicy = (administratorRoleArns: string[]): PolicyDocument => {
  return new PolicyDocument({
    statements: [
      new PolicyStatement({
        actions: ['kms:*'],
        resources: ['*'],
        principals: getAdministratorArns(administratorRoleArns),
      }),
    ],
  });
};
export class KmsEncryptionKey extends Construct {
  kmsKey: IKey;
  description: string;
  keyName: string;
  environmentName: string;

  constructor(scope: Construct, id: string, props?: IKmsEncryptionKeyProps) {
    super(scope, id);
    this.environmentName = props?.environmentName ?? 'DEV';
    this.description = this.getKeyName(props?.description);
    this.keyName = this.getKeyName(props?.keyName);
    this.kmsKey = this.createKmsKey(props?.administratorRoleArns ?? []);
    this.addTags();
  }

  getKeyName(keyName?: string): string {
    return keyName ?? `${this.environmentName}-kms-encryption-key`;
  }

  createKmsKey(administratorRoleArns: string[]): Key {
    return new Key(this, 'EncryptionKey', {
      alias: this.keyName,
      description: this.description,
      removalPolicy: RemovalPolicy.RETAIN,
      policy: createKeyPolicy(administratorRoleArns),
    });
  }

  addTags() {
    Tags.of(this).add('environment', this.environmentName);
    Tags.of(this).add('alias', this.keyName);
  }
}
