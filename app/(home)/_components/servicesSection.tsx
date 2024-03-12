"use client"

import { Card, CardContent } from "@/app/_components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/app/_components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { Award, NotebookPen, Sparkles, UserRoundCheck } from "lucide-react";

const services = [
  {
    id: 0,
    icon: <NotebookPen className="size-8 text-purple-500" />,
    title: "AGENDAMENTO FACILITADO",
    description: "Agendar um corte de cabelo nunca foi tão fácil! Com nossa plataforma intuitiva e amigável, você pode marcar seu próximo corte de cabelo em apenas alguns cliques. Escolha seu barbeiro preferido, selecione o horário que melhor se adequa à sua agenda e pronto! Sem complicações, sem espera."
  },
  {
    id: 1,
    icon: <Award className="size-8 text-purple-500" />,
    title: "ATENDIMENTO VIP",
    description: "Valorizamos cada cliente e oferecemos um atendimento personalizado para atender às suas necessidades específicas. Nossa equipe é treinada para entender suas preferências individuais e oferecer sugestões personalizadas para o seu estilo, garantindo uma experiência única e satisfatória em nossa barbearia."
  },
  {
    id: 2,
    icon: <UserRoundCheck className="size-8 text-purple-500" />,
    title: "EQUIPE ESPECIALIZADA",
    description: "Nossa equipe é composta por profissionais altamente qualificados e apaixonados pelo que fazem. Com anos de experiência no ramo da beleza masculina, estamos aqui para oferecer a você serviços de qualidade e um atendimento excepcional.Desde cortes clássicos até as últimas tendências em barbearia."
  },
  {
    id: 3,
    icon: <Sparkles className="size-8 text-purple-500" />,
    title: "AMBIENTE ACOLHEDOR",
    description: "Além de contar com uma equipe especializada, nossa barbearia proporciona um ambiente acolhedor e descontraído. Queremos que você se sinta confortável e relaxado durante seu tempo conosco. Desde a música ambiente até os detalhes da decoração, cuidamos de cada aspecto para criar uma atmosfera agradável e convidativa."
  },
]


const ServicesSection = () => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
      className="flex pl-5 gap-3 lg:px-0"
    >
      <CarouselContent className="w-11/12 lg:w-1/2">
        {services.map(card => (
          <CarouselItem key={card.id}>
            <Card className="min-w-full max-w-full rounded-2xl h-[250px] md:h-40 lg:h-[214px]">
              <CardContent className="px-1 py-0 pt-1">
                <div className="flex gap-1 flex-col items-start px-2 pb-3 ">

                  <h2 className="flex gap-2 items-center font-bold mt-2 mb-2 overflow-hidden text-ellipsis text-nowrap lg:text-lg">
                    {card.icon}
                    {card.title}
                  </h2>

                  <p className="text-sm text-gray-400 lg:text-base">
                    {card.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="hidden" />

      <CarouselNext className="hidden" />

    </Carousel>
  )
}

export default ServicesSection;