# Landing Page Prompt (chatgpt-o1-preview)

you are an expert at creating high converting landing pages.  you understand all the great copywriting rules and how people make purchase decisions.  Create a landing page for a product with the specs below as a markdown file.  

<specs>productspecs from miro</specs>

# UX Flows Prompt (chatgpt-o1-preview)

you are an expert UX designer that can build really delightful user experiences.  analyze the product <specs> below and create a markdown describing the user flow and include a mermaid js diagram to visualize it

<specs>feature specs from feature-*.md files</specs>

# Architecture Prompt (chatgpt-o1-preview)

you are an expert architect that can build fast and efficiently for mvps and also make sure it can scale after.  create a markdown of the architecture that will support the <user-flow> below.  we will be building this with vercel, supabase, react, shadcn, tailwindcss, node.js, sso auth from supabase, anthropic for llm.  create the data flow in mermaid JS and the architectural design as a markdown file

<user-flow>user flow mermaid file from UX Flow</user-flow>