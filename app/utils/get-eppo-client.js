export default async function getEppoClient() {
  // Dynamically import Eppo SDK inside the function (no top-level await)
  const { init } = await import('@eppo/js-client-sdk');

  const eppoSdkKey = import.meta.env.VITE_EPPO_SDK_KEY;

  const eppoClient = await init({
    apiKey: eppoSdkKey,
    assignmentLogger: {
      logAssignment(assignment) {
        console.log('Eppo Assignment:', assignment);
      },
    },
  }).catch((err) => {
    console.error('Error initializing Eppo SDK:', err);
    return null; // Return null if the SDK fails to initialize
  });

  return eppoClient;
}
