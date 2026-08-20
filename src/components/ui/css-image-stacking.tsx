export type CssImageStackingImage = {
  src: string;
  alt: string;
  label?: string;
};

type CssImageStackingProps = {
  images: CssImageStackingImage[];
  className?: string;
};

const cardStyles = [
  {
    offset: 'top-0',
    width: 'w-full',
    shadow: '',
    layer: 'z-10',
  },
  {
    offset: 'top-2',
    width: 'w-full',
    shadow: '',
    layer: 'z-20',
  },
  {
    offset: 'top-4',
    width: 'w-full',
    shadow: '',
    layer: 'z-30',
  },
  {
    offset: 'top-6',
    width: 'w-full',
    shadow: '',
    layer: 'z-40',
  },
  {
    offset: 'top-8',
    width: 'w-full',
    shadow: '',
    layer: 'z-50',
  },
];

export default function CssImageStacking({
  images,
  className = '',
}: CssImageStackingProps) {
  const cards = images.slice(0, 5);

  return (
    <div className={`relative w-full max-w-full overflow-x-clip bg-[#090e12] ${className}`}>
      {cards.map((image, index) => {
        const card = cardStyles[index] ?? cardStyles[cardStyles.length - 1];

        return (
          <div
            key={`${image.src}-${index}`}
            className={`sticky ${card.offset} ${card.layer} flex h-screen h-[100dvh] min-h-[520px] w-full items-center justify-center overflow-hidden bg-[#090e12] p-0`}
          >
            <figure
              className={`relative m-0 h-full w-full overflow-hidden rounded-none bg-[#12191f] shadow-none transition-all duration-300 ${card.width} ${card.shadow}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                width='1600'
                height='900'
                loading={index < 2 ? 'eager' : 'lazy'}
                decoding='async'
                draggable='false'
                className='block h-full w-full select-none object-cover'
              />
              <div
                aria-hidden='true'
                className='absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/65 to-transparent'
              />
              {image.label ? (
                <figcaption className='absolute bottom-5 left-5 text-[0.64rem] uppercase tracking-[0.13em] text-[#f6f1e9] sm:bottom-7 sm:left-8'>
                  {image.label}
                </figcaption>
              ) : null}
            </figure>
          </div>
        );
      })}
    </div>
  );
}
