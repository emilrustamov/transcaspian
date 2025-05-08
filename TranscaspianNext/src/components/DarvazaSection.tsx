import { useState } from "react";

function DarvazaSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="lg:pr-[130px]">
      <div className="flex flex-col items-center my-10">
        <h2 className="text-3xl lg:text-4xl font-serif text-trans-red text-center mb-4 uppercase">
          An Essential Stop for Travelers In Turkmenistan
        </h2>
        <hr className="border border-trans-brown w-[70%] mx-auto mb-6 shadow" />

        <div className="relative flex flex-col lg:flex-row items-center lg:items-start">
          <div className="lg:w-1/3 lg:sticky top-10">
            <img
              src="https://transcaspiantours.com/api/image/92ba9420-4869-4122-9a53-c119c293a529.webp"
              alt="Darvaza"
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>

          <div className="lg:w-2/3 lg:pl-10 text-center lg:text-left mt-6 lg:mt-0">
            <h3 className="text-2xl lg:text-3xl font-serif text-trans-red mb-4">
              Darvaza
            </h3>
            <p className="text-base lg:text-lg text-gray-800 whitespace-pre-line text-justify">
              In every country, there are places that simply cannot be missed.
              In China, it&apos;s the Great Wall; in France, the Eiffel Tower;
              in Russia, the Kremlin. This list could go on endlessly, as every
              nation has landmarks that symbolize its identity. In Turkmenistan,
              that place is the Darvaza Gas Crater (also known as the Door to
              Hell, Darwaza, or Derweze). This extraordinary wonder is not just
              a tourist attraction; it&apos;s a site that encapsulates the raw
              beauty, mystery, and awe-inspiring power of nature and history
              combined.
            </p>

            <div
              className={`transition-all duration-500 ${
                isExpanded
                  ? "blur-0 max-h-full"
                  : "blur-sm max-h-[200px] overflow-hidden"
              }`}
            >
              <p className="text-base lg:text-lg text-gray-800 mt-4 whitespace-pre-line text-justify">
                Located in the heart of the Karakum Desert, the Darvaza Gas
                Crater stands as a fiery beacon in the vast, golden sands. This
                natural gas field collapsed into a cavern decades ago, and what
                began as a Soviet-era drilling project turned into one of the
                most unique and mesmerizing sights in the world. Known locally
                as &quot;Derweze,&quot; meaning &quot;door,&quot; the site has
                earned its nickname &quot;Door to Hell&quot; due to its eternal
                flames that have been burning for over 50 years.
              </p>
              <p className="text-base lg:text-lg text-gray-800 mt-4 whitespace-pre-line text-justify">
                The Darvaza Crater is not just a geological phenomenon;
                it&apos;s a symbol of Turkmenistan&apos;s rich and untamed
                natural landscape. Measuring roughly 70 meters in diameter and
                30 meters in depth, this fiery pit attracts adventurers,
                photographers, and travelers from all corners of the globe.
                Whether you&apos;re visiting to marvel at its glowing embers
                under the starry desert sky or to feel the intense heat
                radiating from its core, Darvaza offers an experience like no
                other.
              </p>
              <p className="text-base lg:text-lg text-gray-800 mt-4 whitespace-pre-line text-justify">
                <strong>Why Visit Darvaza?</strong> A visit to Darvaza (or
                Darwaza, Derweze) is a journey into the heart of
                Turkmenistan&apos;s unique charm. The crater&apos;s flames are
                visible from miles away, creating an almost otherworldly
                ambiance, especially at night. As the sun sets and darkness
                blankets the desert, the fiery glow of the crater becomes a
                breathtaking sight that captivates every traveler.
              </p>
              <p className="text-base lg:text-lg text-gray-800 mt-4 whitespace-pre-line text-justify">
                Beyond its visual allure, Darvaza represents a stark reminder of
                humanity&apos;s interaction with nature. The crater was ignited
                to prevent the spread of methane gas, but instead of burning out
                as planned, the fire has continued to rage for decades, becoming
                a symbol of the unexpected beauty that can arise from human
                error.
              </p>
              <p className="text-base lg:text-lg text-gray-800 mt-4 whitespace-pre-line text-justify">
                <strong>How to Experience Darvaza?</strong> The best way to
                experience Darvaza is by embarking on a desert adventure. Many
                tour operators in Turkmenistan offer guided trips that include
                camping near the crater, allowing visitors to enjoy its
                mesmerizing glow overnight. Imagine sitting around the edge of
                the crater, feeling the warmth of the flames while surrounded by
                the serene silence of the desert.
              </p>
              <p className="text-base lg:text-lg text-gray-800 mt-4 whitespace-pre-line text-justify">
                For the full experience, pair your visit with other nearby
                attractions such as the ancient ruins of Merv or the unique
                village of Nokhur. Turkmenistan is a land of contrasts, blending
                modern marvels with ancient history, and Darvaza is the perfect
                starting point for exploring its mysteries.
              </p>
              <p className="text-base lg:text-lg text-gray-800 mt-4 whitespace-pre-line text-justify">
                <strong>Why Darvaza Should Be on Your Bucket List?</strong>{" "}
                Darvaza is more than just a natural gas crater; it&apos;s a
                testament to the unpredictability of nature and the resilience
                of the human spirit. Whether you call it Darvaza, Darwaza, or
                Derweze, this &quot;Door to Hell&quot; is a destination that
                stays with you long after your visit. Its fiery depths,
                captivating beauty, and cultural significance make it a must-see
                for anyone traveling to Turkmenistan.
              </p>
            </div>
            <button
              className="mt-4 px-6 py-2 bg-trans-red text-white rounded-md hover:bg-trans-dark-red transition-all text-left"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DarvazaSection;
