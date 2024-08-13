const Galery = () => {
  return (
    <section className="flex w-full flex-col gap-3 px-5 grayscale lg:px-0">
      <div className="flex w-full gap-3">
        <div className="flex w-full flex-col gap-3 overflow-hidden">
          <div className="flex overflow-hidden rounded-lg">
            <img
              src="/image_galery_1.jpg"
              alt="teste"
              className="h-40 w-full object-cover duration-200 hover:scale-105 hover:opacity-30"
            />
          </div>

          <div className="flex overflow-hidden rounded-lg">
            <img
              src="/image_galery_2.jpg"
              alt="teste"
              className="h-40 w-full object-cover duration-200 hover:scale-105 hover:opacity-30"
            />
          </div>
        </div>

        <div className="flex gap-3 overflow-hidden">
          <div className="flex gap-3 overflow-hidden rounded-lg">
            <img
              src="/teste.jpeg"
              alt="teste"
              className="h-[332px] w-[350px] object-cover duration-200 hover:scale-105 hover:opacity-30 md:w-[1000px]"
            />
          </div>

          <div className="flex flex-col gap-3 overflow-hidden">
            <div className="flex overflow-hidden rounded-lg">
              <img
                src="/image_galery_4.jpg"
                alt="image_4"
                className="h-28 w-full object-cover duration-200 hover:scale-105 hover:opacity-30 md:w-[1400px]"
              />
            </div>

            <div className="flex overflow-hidden rounded-lg">
              <img
                src="/image_galery_5.jpg"
                alt="teste"
                className="h-[208px] w-full object-cover duration-200 hover:scale-105 hover:opacity-30"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full gap-3">
        <div className="flex w-full gap-3 overflow-hidden rounded-lg">
          <img
            src="/image_galery_6.jpg"
            alt="image_6"
            className="h-[332px] w-full object-cover duration-200 hover:scale-105 hover:opacity-30"
          />
        </div>

        <div className="flex w-full flex-col gap-3 overflow-hidden md:w-[3000px] md:flex-row">
          <div className="flex w-full gap-3 overflow-hidden rounded-lg md:w-[2500px]">
            <img
              src="image_galery_7.jpg"
              alt="teste"
              className="h-40 w-full object-cover duration-200 hover:scale-105 hover:opacity-30 md:h-[332px]"
            />
          </div>

          <div className="flex w-full gap-3 overflow-hidden rounded-lg">
            <img
              src="image_galery_8.jpg"
              alt="teste"
              className="h-40 w-full object-cover duration-200 hover:scale-105 hover:opacity-30 md:h-[332px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Galery;
