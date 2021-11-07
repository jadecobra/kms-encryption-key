import { haveResource, expect as expectCDK } from '@aws-cdk/assert';
import { App, Stack } from '@aws-cdk/core';
import { KmsEncryptionKey } from '../src';

const administratorRoleArns = () => {
  return ['a', 'b', 'c', 'd'].map(
    (name) => `arn:aws:iam::123456789012:role/${name}`
  );
};
test('Encryption Key contains KMS Key', () => {
  const app = new App();
  const stack = new Stack(app, 'TestEncryptionKey');
  new KmsEncryptionKey(stack, 'EncryptionKey', {
    keyName: 'TestKey',
    environmentName: 'TEST',
    administratorRoleArns: administratorRoleArns(),
  });
  expectCDK(stack).to(
    haveResource('AWS::KMS::Key', {
      KeyPolicy: {
        Statement: [
          {
            Action: 'kms:*',
            Effect: 'Allow',
            Principal: {
              AWS: administratorRoleArns(),
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
                    ':iam::',
                    {
                      Ref: 'AWS::AccountId',
                    },
                    ':root',
                  ],
                ],
              },
            },
            Resource: '*',
          },
        ],
        Version: '2012-10-17',
      },
      Description: 'TEST-kms-encryption-key',
      Tags: [
        {
          Key: 'environment',
          Value: 'TEST',
        },
        {
          Key: 'name',
          Value: 'TestKey',
        },
      ],
    })
  );
});
