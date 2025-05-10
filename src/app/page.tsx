'use client'

import { Button } from "./components/Button";
import Header from "./components/Header";
import Image from "next/image";

import HeroImg from '../../public/hero1.png'
import ImgVideo1 from '../../public/imgVideo1.png'
import ImgVideo2 from '../../public/imgVideo2.png'
import HeroImgMobile from '../../public/hero1-mobile.png'
import Banner1 from '../../public/banner1.png'
import Banner2 from '../../public/banner2.png'
import Banner3 from '../../public/banner3.png'
import Footer from "./components/Footer";
import { TitleSection } from "./components/TitleSection";
//import { Card } from "@/components/Card";
import { useState } from "react";
//import { Testimonial } from "./components/Testimonial";
import { Slider } from "./components/Slider";
import { IconWhatsapp } from "./components/IconWhatsapp";
import { Banner } from "./components/Banner";
import Link from "next/link";
import { Features } from "./components/Features";
import { PiArrowRightBold, PiClockFill, PiNoteFill, PiWhatsappLogoFill } from "react-icons/pi";


const tabs = [
  { img: Banner1 },
  { img: Banner2 },
  { img: Banner3 },
]

export default function Home() {
  const [index, setIndex] = useState(0)
  const [showPromotion, setShowPromotion] = useState(true)

  return (
    <div className=" ">
      <Header showPromotion={showPromotion} setShowPromotion={setShowPromotion} />

      <main className={` m-auto ${showPromotion ? 'md:pt-40 pt-44' : 'pt-20'} text-center `}>

        <div className="flex flex-col items-center justify-center mt-20 max-w-[1200px] m-auto">

          <div className="bg-white rounded-full px-4 py-2 flex gap-2 items-center text-xs md:text-base">
            <span className="text-[#07090D] font-semibold">Controle sua Revenda com o melhor Sistema do Brasil</span>
            <div className="h-5 w-5 rounded-full bg-[#07090D]" />
          </div>

          <h2 className="bg-gradient-to-r text-transparent max-w-[700px] bg-clip-text from-cyan-300 to-blue-600 text-6xl font-extrabold mt-10">
            Simplifique a Gestão da Sua Revenda de Gás
          </h2>

          <p className="text-xl mt-10 max-w-[630px] px-4">
            Controle pedidos, entregas, estoque e pagamentos em um só lugar de forma simples e rápida.
          </p>
          <p className="text-xl"></p>

          <div className="mt-10 flex gap-4">
            <Link href={'https://api.whatsapp.com/send?phone=5531984372245&text=Olá%20gostaria%20de%20testar%20o%20Sistema%20Telesys%20por%207%20dias%20grátis.%20😀'} target="_blank">
              <Button title="Teste Grátis por 7 Dias" />
            </Link>
            <Link href={'https://youtube.com/netxpertbr'} target="_blank">
              <Button title="Ver Demonstração" variant="OUTLINE" />
            </Link>
          </div>

          <div className="hidden md:flex mt-16 max-h-[480px] mx-4">
            <Image src={HeroImg} alt="banner" className="max-h-[480px] w-auto rounded-3xl" />
          </div>

          <div className="md:hidden mt-16  mx-4">
            <Image src={HeroImgMobile} alt="banner" className="max-h-[480px] w-auto rounded-3xl" />
          </div>

        </div>

        <section className="max-w-[1200px] m-auto px-4">
          <Features />
        </section>

        <section className="pt-30 max-w-[1200px] m-auto px-4" id="suporte">
          <TitleSection
            title="Precisa de ajuda?"
            description="Nossa equipe de suporte é treinada e está disponível para lhe ajudar no que for necessário"
            titleButtonSolid="Chamar Suporte"
            titleButtonOutline="Ver treinamento"
            buttons
          />

          <div className="mt-20 flex flex-col gap-8 lg:gap-0 lg:flex-row justify-between items-center">
            <div className="flex flex-col gap-6">
              <div className="max-w-[400px] hover:cursor-pointer " onClick={() => setIndex(0)}>
                <h4 className={`font-bold ${index === 0 && 'text-sky-500'}  mb-2`}>Treinamento em Vídeo</h4>

                <p className="text-white/80">Nosso treinamento está
                  disponível no nosso canal do Youtube e você pode
                  assistir quando quiser, isso ajuda na assimilação
                  do sistema.</p>
              </div>

              <div className="border-white/10 border-b max-w-[400px]" />

              <div className="max-w-[400px] hover:cursor-pointer " onClick={() => setIndex(1)}>
                <h4 className={`font-bold ${index === 1 && 'text-sky-500'}  mb-2`}>Suporte via Whatsapp</h4>

                <p className="text-white/80">O atendimento via Whatsapp
                  é mais rápido e prático, acessível a todos e de fácil
                  manuseio. Suporte on-line de Segunda a Sexta
                  de 8h às 18h.</p>
              </div>

              <div className="border-white/10 border-b max-w-[400px]" />

              <div className="max-w-[400px] hover:cursor-pointer " onClick={() => setIndex(2)}>
                <h4 className={`font-bold ${index === 2 && 'text-sky-500'}  mb-2`}>Atualizações</h4>

                <p className="text-white/80">O Sistema Telesys vem sendo desenvolvido
                  há mais de 20 anos, e conta com tecnologia de ponta. Fornecemos
                  constantes atualizações com inovações e correções do sistema.</p>
              </div>
            </div>

            <div className="md:h-[400px] md:w-[630px] md:ml-4">
              <div className="w-full h-full bg-gradient-to-tl to-sky-300 via-emerald-400 from-blue-700 rounded-2xl p-5">
                {
                  tabs.map((tab, i) => {
                    return (
                      <div key={i} className={`${i === index ? '' : 'hidden'} flex items-center justify-center h-full `}>
                        <Image src={tab.img} alt="banner" className="rounded-lg shadow-xl shadow-zinc-950 " />
                      </div>
                    )
                  })
                }

              </div>
            </div>
          </div>

        </section>


        <section className="pt-56 overflow-x-scroll w-full relative z-0">
          {/* <Testimonial /> */}
          <Slider />
        </section>

        <section className="pt-30 pb-20 max-w-[1200px] m-auto px-4">
          <TitleSection
            title="Veja um pouco do Telesys"
            description="Veja alguns vídeos do Sistema Telesys em funcionamento e como você pode ser eficiente no controle da sua revenda"

          />

          <div className="mt-20 flex flex-col min-[1250px]:flex-row items-center justify-center  gap-8">

            <div className="border border-[#4C5155] lg:max-w-[600px] w-full rounded-3xl">
              <div className=" p-10">
                <h3 className="text-3xl font-semibold">Conheça o Telesys</h3>

                <p className="text-white/80 text-xl mt-4 mb-10">Assita esse video de apresentação do Telesys e tenha uma boa noção de
                  como o sistema funciona e como ele pode lhe ajudar</p>

                <div className="flex justify-center">
                  <button className="py-2 bg-white w-fit rounded-full flex items-center gap-2 px-4 text-[16px] text-[#07090D]">
                    <p className="font-semibold">
                      Assistir Apresentação do Telesys
                    </p>

                    <div className="h-5 w-5 rounded-full bg-[#07090D] text-white flex items-center justify-center">
                      <PiArrowRightBold size={12} />
                    </div>
                  </button>
                </div>

              </div>

              <div className="w-full overflow-hidden rounded-3xl">
                <Image src={ImgVideo1} alt="" className="w-full" />
              </div>
            </div>


            <div className="border border-[#4C5155] lg:max-w-[600px] w-full rounded-3xl">
              <div className=" p-10">
                <h3 className="text-3xl font-semibold">Rastreio GPS</h3>

                <p className="text-white/80 text-xl mt-4 mb-10">Assita esse video de apresentação do módulo de Rastrio GPS
                  que permite acompanhar as entregas em tempo real no Telesys</p>

                <div className="flex justify-center">
                  <button className="py-2 bg-white w-fit rounded-full flex items-center gap-2 px-4 text-[16px] text-[#07090D]">
                    <p className="font-semibold">
                      Assistir Módulo Rastreio GPS
                    </p>

                    <div className="h-5 w-5 rounded-full bg-[#07090D] text-white flex items-center justify-center">
                      <PiArrowRightBold size={12} />
                    </div>
                  </button>
                </div>

              </div>

              <div className="w-full overflow-hidden rounded-3xl">
                <Image src={ImgVideo2} alt="" className="w-full " />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 justify-center mt-20">
            <div className="max-w-[400px] md:max-w-[313px] text-left">
              <h5 className="flex items-center gap-2 font-semibold mb-2">
                <div className="text-sky-400">
                  <PiWhatsappLogoFill />
                </div>
                Módulo de Whatsapp
              </h5>
              <p className="text-white/80">
                Com este módulo você permitirá
                que seu cliente faça pedidos
                diretamente do Whatsapp sem
                interação humana e também fazer
                envio de mensagens em massa.
              </p>
            </div>

            <div className="max-w-[400px] md:max-w-[313px] text-left">
              <h5 className="flex items-center gap-2 font-semibold mb-2">
                <div className="text-sky-400">
                  <PiClockFill />
                </div>
                Módulo Leitura de Gás
              </h5>
              <p className="text-white/80">
                Com o módulo de Leitura de Gás você poderá
                fazer venda e controle de gás à granel. Facilite as
                leituras de consumo através do Sistema Telesys ou no Aplicativo
                de Leitura de Gás.</p>
            </div>

            <div className="max-w-[400px] md:max-w-[313px] text-left">
              <h5 className="flex items-center gap-2 font-semibold mb-2">
                <div className="text-sky-400">
                  <PiNoteFill />
                </div>
                Módulo Fiscal
              </h5>
              <p className="text-white/80">
                Com o Módulo Fiscal do Telesys você conseguirá
                fazer emissão de NFE e NFCE de forma simples e
                descomplicada. Conte também com geração dos Livros Fiscais
                de Sintegra e SPED.</p>
            </div>




          </div>

        </section>

        <section className="pt-30 pb-20 max-w-[1200px] m-auto px-4">
          <TitleSection
            title="Planos do Telesys"
            description="Conheça nossos planos e módulos e veja o que mais se adapta com a 
            sua Revenda de Gás"
            titleButtonSolid="Contratar  Plano"
            titleButtonOutline="Saber mais"
            buttons
          />

          <div>

          </div>
        </section>

      </main>

      <Footer />

      <IconWhatsapp />

      <Banner />
    </div>
  );
}
