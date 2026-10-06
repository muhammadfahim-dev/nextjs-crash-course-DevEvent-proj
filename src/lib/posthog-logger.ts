import posthog from "posthog-js"

type LogAttributes = Record<string, string>

export const posthogLogger = {
  info(message: string, attributes: LogAttributes = {}) {
    if (
      process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN &&
      process.env.NEXT_PUBLIC_POSTHOG_HOST
    ) {
      posthog.logger.info(message, attributes)
    }
  },
}
