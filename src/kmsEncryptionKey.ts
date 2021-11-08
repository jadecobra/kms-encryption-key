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
  readonly kmsAdministratorArns?: string[];
  readonly environmentName?: string;
  readonly description?: string;
}

export class KmsEncryptionKey
  extends Construct
  implements IKmsEncryptionKeyProps
{
  static getArnPrincipals(kmsAdministratorArns: string[]): ArnPrincipal[] {
    return kmsAdministratorArns.map((arn) => new ArnPrincipal(arn));
  }

  static getAdministratorArns(
    kmsAdministratorArns: string[]
  ): CompositePrincipal[] {
    return [
      new CompositePrincipal(
        ...KmsEncryptionKey.getArnPrincipals(kmsAdministratorArns)
      ),
    ];
  }

  static createKeyPolicy(kmsAdministratorArns: string[]): PolicyDocument {
    return new PolicyDocument({
      statements: [
        new PolicyStatement({
          actions: ['kms:*'],
          resources: ['*'],
          principals: KmsEncryptionKey.getAdministratorArns(
            kmsAdministratorArns
          ),
        }),
      ],
    });
  }

  readonly kmsKey: IKey;
  readonly description?: string;
  readonly keyName: string;
  readonly environmentName?: string;

  constructor(scope: Construct, id: string, props?: IKmsEncryptionKeyProps) {
    super(scope, id);
    this.environmentName = props?.environmentName ?? 'DEV';
    this.description = this.getKeyName(props?.description);
    this.keyName = this.getKeyName(props?.keyName);
    this.kmsKey = this.createKmsKey(props?.kmsAdministratorArns ?? []);
    this.addTags();
  }

  getKeyName(keyName?: string): string {
    return keyName ?? `${this.environmentName}-kms-encryption-key`;
  }

  createKmsKey(kmsAdministratorArns: string[]): Key {
    return new Key(this, 'EncryptionKey', {
      alias: this.keyName,
      description: this.description,
      removalPolicy: RemovalPolicy.RETAIN,
      policy: KmsEncryptionKey.createKeyPolicy(kmsAdministratorArns),
    });
  }

  addTags() {
    Tags.of(this).add('environment', this.environmentName as string);
    Tags.of(this).add('alias', this.keyName);
  }
}
