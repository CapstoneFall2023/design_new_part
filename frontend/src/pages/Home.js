import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section>
      <div class="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24 grid h-screen place-items-center">
        <div className="flex flex-col w-full mb-12 text-center">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mx-auto mb-5 text-blue-600 rounded-full bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 2v4a2 2 0 0 0 2 2h4"></path>
              <line x1="8" y1="2" x2="8" y2="2"></line>
              <line x1="12" y1="2" x2="12" y2="2"></line>
              <line x1="16" y1="2" x2="16" y2="2"></line>
              <line x1="8" y1="6" x2="8" y2="6"></line>
              <line x1="12" y1="6" x2="12" y2="6"></line>
              <line x1="16" y1="6" x2="16" y2="6"></line>
              <line x1="8" y1="10" x2="8" y2="10"></line>
              <line x1="12" y1="10" x2="12" y2="10"></line>
              <line x1="16" y1="10" x2="16" y2="10"></line>
            </svg>
          </div>

          <h1 className="max-w-full text-xl font-bold leading-none tracking-tighter text-neutral-600 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
            Taxation <br className="hidden lg:block" />
            in the Digital Economy
          </h1>

          <p className="max-w-xl mx-auto mt-8 text-base leading-relaxed text-center text-gray-500">
            Taxation Simplified is a website that offers expert guidance &amp;
            assistance on various tax issues &amp; helps you save time &amp;
            money on your taxes.
          </p>

          <Link
            className="mx-auto mt-8 text-sm font-semibold text-blue-600 hover:text-neutral-600"
            title="read more"
          >
            {" "}
            Read more »{" "}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
