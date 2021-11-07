const { AwsCdkConstructLibrary } = require('projen');
const { DependabotScheduleInterval } = require('projen/lib/github');
const projectName = () => {
  return 'kms-encryption-key';
};
const moduleName = () => {
  return projectName().replaceAll('-', '_');
};

const project = new AwsCdkConstructLibrary({
  author: 'jakeitegsy',
  authorAddress: 'jakeitegsy@yahoo.com',
  cdkVersion: '1.95.2',
  defaultReleaseBranch: 'main',
  name: projectName(),
  repositoryUrl: 'https://github.com/jakeitegsy/kms-encryption-key.git',
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
    module: moduleName(),
  },
  // publishToGo: {
  //   module: moduleName(),
  // },
  // publishToNuget: {
  //   dotNamespace: 'JadeCobra.KmsEncryptionKey',
  //   packageId: 'Kms.Encryption.Key',
  // },
  catalog: {
    announce: true,
    twitter: '@jakeitegsy',
  },
  description:
    'CDK Construct to create KMS Key for Encryption and defined Administrators in a Key Policy' /* The description is just a string that helps people understand the purpose of the package. */,
  // cdkTestDependencies: undefined,  /* AWS CDK modules required for testing. */
  // deps: [],                        /* Runtime dependencies of this module. */
  // devDeps: [],                     /* Build dependencies for this module. */
  // packageName: undefined,          /* The "name" in package.json. */
  // release: undefined,              /* Add release management to this project. */
});
project.synth();
