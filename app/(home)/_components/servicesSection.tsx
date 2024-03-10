import { Card, CardContent } from "@/app/_components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/app/_components/ui/carousel";
import { NotebookPen, Sparkles } from "lucide-react";

// interface ServicesArray {
//   id: number;
//   // icon:
//   title: string;
//   description: string;
// }

const services = [
  {
    id: 0,
    icon: <NotebookPen className="mt-2" />,
    title: "FACIL DE AGENDAMENTO",
    description: "Agendar um corte de cabelo nunca foi tão fácil! Com nossa plataforma intuitiva e amigável, você pode marcar seu próximo corte de cabelo em apenas alguns cliques. Escolha seu barbeiro preferido, selecione o horário que melhor se adequa à sua agenda e pronto! Sem complicações, sem espera."
  },

  {
    id: 1,
    icon: <Sparkles className="mt-2 size-8" />,
    title: "AVALIAÇÕES",
    description: "Confie na opinião de milhares de clientes satisfeitos que já experimentaram os serviços de barbearia através da nossa plataforma. Com avaliações transparentes e recomendações genuínas, você pode escolher seu próximo estabelecimento ou profissional com total confiança e tranquilidade."
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
                <div className="flex flex-col items-center justify-center  px-2 pb-3 ">

                  <h2 className="flex items-center font-bold mt-2 mb-2 overflow-hidden text-ellipsis text-nowrap">
                    {card.icon}
                    {card.title}

                  </h2>

                  <p className="text-sm text-center text-gray-400">
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