const { AwsCdkConstructLibrary } = require('projen');
const { DependabotScheduleInterval } = require('projen/lib/github');
const projectName = () => {
  return 'kms-encryption-key';
};

const project = new AwsCdkConstructLibrary({
  author: 'jakeitegsy',
  authorAddress: 'jakeitegsy@yahoo.com',
  cdkVersion: '1.95.2',
  defaultReleaseBranch: 'main',
  name: projectName(),
  repositoryUrl: 'https://github.com/jadecobra/kms-encryption-key.git',
  cdkAssert: true,
  cdkDependencies: ['@aws-cdk/core', '@aws-cdk/aws-kms', '@aws-cdk/aws-iam'],
  cdkVersionPinning: false,
  docgen: true,
  license: 'Apache-2.0',
  npmAccess: 'public',
  eslint: true,
  antitamper: true,
  dependabot: true,
  dependabotOptions: {
    autoMerge: true,
    ignoreProjen: true,
    scheduleInterval: DependabotScheduleInterval.WEEKLY,
  },
  defaultReleaseCommitMessage: 'Release {{version}}',
  releaseToNpm: true,
  releaseToGitHub: true,
  publishToPypi: {
    distName: projectName(),
    module: projectName().replace(/-/gi, '_'),
  },
  catalog: {
    announce: true,
    twitter: '@jakeitegsy',
  },
  description:
    'CDK Construct to create KMS Key with defined Administrator Role Arns',
});
project.synth();
