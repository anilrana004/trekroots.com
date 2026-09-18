import { createClient } from "next-sanity";

const client = createClient({
  projectId: "w00xdoog",
  dataset: "production",
  apiVersion: "2025-09-18",
  useCdn: true,
});

const count = await client.fetch('count(*[_type == "blogPost"])');
const types = await client.fetch("array::unique(*[]._type)");
console.log("blogPost count:", count);
console.log("document types:", types);
