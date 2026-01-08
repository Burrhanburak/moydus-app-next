// Her city/state/service sayfasının altına otomatik embed ekleniyor:  My Maps Embed (Services + Blog pages)

export default function MyMapsEmbed({ mapUrl }: { mapUrl: string }) {
  if (!mapUrl) return null;

  return (
    <div className="my-12 w-full">
      <h2 className="text-xl font-semibold mb-3">Service Map Coverage</h2>

      <iframe
        src={mapUrl}
        width="100%"
        height="380"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
      ></iframe>

      <p className="text-gray-500 text-sm mt-2">
        This map shows our verified service coverage for this location.
      </p>
    </div>
  );
}
