import {
  ArnPrincipal,
  CompositePrincipal,
  PolicyDocument,
  PolicyStatement,
} from '@aws-cdk/aws-iam';
import { Key } from '@aws-cdk/aws-kms';
import { Construct, RemovalPolicy, Tags } from '@aws-cdk/core';

export interface KmsEncryptionKeyProps {
  readonly keyName?: string;
  readonly kmsAdministratorArns?: string[];
  readonly environmentName?: string;
  readonly description?: string;
}

export class KmsEncryptionKey extends Construct {
  static getArnPrincipals(kmsAdministratorArns: string[]): ArnPrincipal[] {
    return kmsAdministratorArns.map((arn) => new ArnPrincipal(arn));
  }

  static getAdministratorArns(
    kmsAdministratorArns: string[],
  ): CompositePrincipal[] {
    return [
      new CompositePrincipal(
        ...KmsEncryptionKey.getArnPrincipals(kmsAdministratorArns),
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
            kmsAdministratorArns,
          ),
        }),
      ],
    });
  }

  public readonly kmsKey: Key;
  public readonly description?: string;
  public readonly keyName: string;
  public readonly environmentName?: string;

  constructor(
    scope: Construct,
    id: string,
    props: KmsEncryptionKeyProps = {},
  ) {
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
