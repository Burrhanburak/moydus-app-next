import { client } from "@/lib/sanity";

export default async function TestSanityPage() {
  try {
    // Test all documents
    const allDocs = await client.fetch(`*[]`);
    console.log("All documents:", allDocs.length);

    // Test categories
    const categories = await client.fetch(`*[_type == "category"]`);
    console.log("Categories:", categories.length, categories);

    // Test templates
    const templates = await client.fetch(`*[_type == "template"]`);
    console.log("Templates:", templates.length, templates);

    return (
      <div className="min-h-screen bg-[#070204] text-white p-8">
        <h1 className="text-2xl font-bold mb-4">Sanity Connection Test</h1>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-white/60">
              Project ID: {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            </p>
            <p className="text-sm text-white/60">
              Dataset: {process.env.NEXT_PUBLIC_SANITY_DATASET}
            </p>
          </div>
          <div>
            <p className="text-lg">Total Documents: {allDocs.length}</p>
            <p className="text-lg">Categories: {categories.length}</p>
            <p className="text-lg">Templates: {templates.length}</p>
          </div>
          {categories.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Categories:</h2>
              <pre className="bg-[#1C1C1C] p-4 rounded overflow-auto">
                {JSON.stringify(categories, null, 2)}
              </pre>
            </div>
          )}
          {templates.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Templates:</h2>
              <pre className="bg-[#1C1C1C] p-4 rounded overflow-auto">
                {JSON.stringify(templates, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-[#070204] text-white p-8">
        <h1 className="text-2xl font-bold mb-4 text-red-400">
          Sanity Connection Error
        </h1>
        <pre className="bg-[#1C1C1C] p-4 rounded overflow-auto text-red-400">
          {error instanceof Error ? error.message : String(error)}
        </pre>
        <div className="mt-4">
          <p className="text-sm text-white/60">
            Project ID: {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
          </p>
          <p className="text-sm text-white/60">
            Dataset: {process.env.NEXT_PUBLIC_SANITY_DATASET}
          </p>
        </div>
      </div>
    );
  }
}
