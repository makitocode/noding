const scanner = require("sonarqube-scanner");

scanner(
  {
    // this example uses local instance of SQ
    options: {
      "sonar.sources": ".",
      "sonar.projectKey": "com.arquisoft.grupo4.marketplace_jwt",
      "sonar.organization": "arquisoft-grupo4",

      "sonar.projectName": "Marketplace JWT",
      "sonar.projectVersion": "1.0",

      "sonar.host.url": "https://sonarcloud.io",
      "sonar.login": "312f45313caba9bf8d56b1f31d7bbdc12cf4d9ed"
    },
  },
  () => {
    // callback is required
  }
);
