import { SSTConfig } from "sst";

import { NextjsSite } from "sst/constructs";
import { RetentionDays } from "aws-cdk-lib/aws-logs";

export default {
  config(_input) {
    return {
      name: "plugin-store-pages",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {

      const site = new NextjsSite(stack, "Site", {
        path: "./",
        // timeout: "180 seconds",
        // memorySize: "4096 MB",
        edge: false,
        cdk: {
          server: {
            logRetention: RetentionDays.ONE_MONTH,
          }
        },
      });

      stack.addOutputs({
        ServiceUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;