import { Card, CardContent } from "@/app/_components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/app/_components/ui/carousel";

// interface ServicesArray {
//   id: number;
//   // icon:
//   title: string;
//   description: string;
// }

const services = [
  {
    id: 0,
    icon: "icone1",
    title: "titulo1",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima hic eligendi beatae quo totam, iste expedita vel accusantium aspernatur molestiae eaque sint aliquam voluptates molestias rem assumenda praesentium ducimus vitae."
  },

  {
    id: 1,
    icon: "icone2",
    title: "titulo2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima hic eligendi beatae quo totam, iste expedita vel accusantium aspernatur molestiae eaque sint aliquam voluptates molestias rem assumenda praesentium ducimus vitae."
  },

  {
    id: 2,
    icon: "icone3",
    title: "titulo3",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima hic eligendi beatae quo totam, iste expedita vel accusantium aspernatur molestiae eaque sint aliquam voluptates molestias rem assumenda praesentium ducimus vitae."
  },

  {
    id: 3,
    icon: "icone4",
    title: "titulo4",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima hic eligendi beatae quo totam, iste expedita vel accusantium aspernatur molestiae eaque sint aliquam voluptates molestias rem assumenda praesentium ducimus vitae."
  },
]


const ServicesSection = () => {
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      className="flex px-5 gap-3 lg:px-0"
    >
      <CarouselContent className="w-11/12 md:w-full">
        {services.map(card => (
          <CarouselItem key={card.id}>
            <Card className="min-w-full max-w-full rounded-2xl">
              <CardContent className="px-1 py-0 pt-1">


                <div className="px-2 pb-3">
                  <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap text-center">
                    {card.title}
                  </h2>

                  <p className="text-sm text-gray-400">
                    {card.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default ServicesSection;