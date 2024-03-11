import React from "react";

function Account() {
  return (
    <div className="bg-white rounded-lg py-5">
      <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
        <div class="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div class="flex items-center justify-center w-full lg:p-12">
            <div class="flex items-center xl:p-10">
              <h1 class="mb-12 text-4xl font-extrabold text-dark-grey-900">
                Account
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
