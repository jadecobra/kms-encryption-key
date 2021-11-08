import { SynthUtils } from '@aws-cdk/assert';
import { Stack } from '@aws-cdk/core';
import { KmsEncryptionKey } from '../src';

test('KmsEncryptionKey creates KMS Encryption Key with administratorRoleArns', () => {
  const stack = new Stack();
  new KmsEncryptionKey(stack, 'Key', {
    description: 'Test Key',
    kmsAdministratorArns: ['arn:aws:iam::123456789012:role/Administrator'],
    keyName: 'test-key',
  });

  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});
