import {
  DisplayProcessor,
  SpecReporter,
  StacktraceOption,
} from "jasmine-spec-reporter";

class CustomProcessor extends DisplayProcessor {
  public displayJasmineStarted(info: jasmine.SuiteInfo): string {
    return `Running suite with ${info.totalSpecsDefined} tests`;
  }
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayStacktrace: StacktraceOption.PRETTY,
    },
    customProcessors: [CustomProcessor],
  })
);
