import BrownButton from "../buttons/BrownButton";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  title: string;
  description: string;
  startButtonText: string;  // Ensure this is defined in the Props type
  image: ImageProps;
};

export type GuestHeroProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const GuestHero = (props: GuestHeroProps) => {
  const { title, description, startButtonText, image } = {
    ...GuestHeroDefaults,
    ...props,
  } as Props;

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
            <div className="w-full lg:max-w-[80%] max-w-[100%] mx-auto">
              <h1 className="mb-5 text-3xl font-bold md:mb-6 md:text-6xl lg:text-7xl">
                {title}
              </h1>
              <p className="md:text-md">{description}</p>
              <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
                <BrownButton title={startButtonText} url="/sign-up" />
              </div>
            </div>
          </div>
          <div>
            <img src={image.src} className="size-full object-cover rounded-xl" alt={image.alt} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestHero;

export const GuestHeroDefaults: GuestHeroProps = {
  title: "BibleMap, the number #1 Bible Learning Platform",
  description:
    "BibleMap is the best Bible learning application for reading and studying the Bible. It is a great way to read, share, and learn more about the Bible. Start now by signing up for free.",
  startButtonText: "Start Now", // Define the default value here
  image: {
    src: "/images/bible2.jpg",
    alt: "BibleApp Header Hero Image",
  },
};
