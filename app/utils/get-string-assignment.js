import getEppoClient from './get-eppo-client';

export default function getStringAssignment(
  flagKey,
  subjectKey,
  subjectAttributes = {},
  defaultValue = ''
) {
  return getEppoClient().then((eppoClient) => {
    return (
      eppoClient?.getStringAssignment(flagKey, subjectKey, subjectAttributes, defaultValue) ?? defaultValue
    );
  });
}
