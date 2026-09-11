import baseRoutes from "./base";

const routes = [
  ...baseRoutes.public,
  ...baseRoutes.private,
];

const linking = {
  prefixes: ["http://localhost:8081"],

  config: {
    screens: Object.fromEntries(
      routes.map((route) => [
        route.name,
        route.path,
      ])
    ),
  },
};

export default linking;