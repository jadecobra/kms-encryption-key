import { haveResource, expect as expectCDK } from '@aws-cdk/assert';
import { App, Stack } from '@aws-cdk/core';
import { KmsEncryptionKey } from '../src';

const kmsAdministratorArns = () => {
  return ['a', 'b', 'c', 'd'].map(
    (name) => `arn:aws:iam::123456789012:role/${name}`
  );
};
const keyName = () => {
  return 'test-key';
};

const environmentName = () => {
  return 'test';
};

const description = () => {
  return `${environmentName()}-kms-encryption-key`;
};

const app = new App();
const stack = new Stack(app, 'TestEncryptionKey', {
  env: {
    account: '123456789012',
    region: 'us-east-1',
  },
});

const testEncryptionKey = new KmsEncryptionKey(stack, keyName(), {
  keyName: keyName(),
  environmentName: environmentName(),
  kmsAdministratorArns: kmsAdministratorArns(),
});

test('Encryption Key Name', () => {
  expect(testEncryptionKey.keyName).toBe(keyName());
});

test('Encryption Key Environment Name', () => {
  expect(testEncryptionKey.environmentName).toBe(environmentName());
});

test('Encryption Key default description when none given', () => {
  expect(testEncryptionKey.description).toBe(description());
});

test('Encryption Key contains KMS Key', () => {
  expectCDK(stack).to(
    haveResource('AWS::KMS::Key', {
      KeyPolicy: {
        Statement: [
          {
            Action: 'kms:*',
            Effect: 'Allow',
            Principal: {
              AWS: kmsAdministratorArns(),
            },
            Resource: '*',
          },
          {
            Action: [
              'kms:Create*',
              'kms:Describe*',
              'kms:Enable*',
              'kms:List*',
              'kms:Put*',
              'kms:Update*',
              'kms:Revoke*',
              'kms:Disable*',
              'kms:Get*',
              'kms:Delete*',
              'kms:ScheduleKeyDeletion',
              'kms:CancelKeyDeletion',
              'kms:GenerateDataKey',
              'kms:TagResource',
              'kms:UntagResource',
            ],
            Effect: 'Allow',
            Principal: {
              AWS: {
                'Fn::Join': [
                  '',
                  [
                    'arn:',
                    {
                      Ref: 'AWS::Partition',
                    },
                    ':iam::123456789012:root',
                  ],
                ],
              },
            },
            Resource: '*',
          },
        ],
        Version: '2012-10-17',
      },
      Description: description(),
      Tags: [
        {
          Key: 'alias',
          Value: keyName(),
        },
        {
          Key: 'environment',
          Value: environmentName(),
        },
      ],
    })
  );
});
