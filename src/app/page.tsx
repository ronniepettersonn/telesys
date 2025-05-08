'use client'

import { Button } from "./components/Button";
import Header from "./components/Header";
import Image from "next/image";

import HeroImg from '../../public/hero1.png'
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


const tabs = [
  { img: Banner1 },
  { img: Banner2 },
  { img: Banner3 },
]

export default function Home() {
  const [index, setIndex] = useState(0)

  return (
    <div className=" ">
      <Header />

      <main className=" m-auto pt-20 ">

        <div className="flex flex-col items-center justify-center mt-20 max-w-[1200px] m-auto">

          <div className="bg-white rounded-full px-4 py-2 flex gap-2">
            <span className="text-[#07090D] font-semibold">Controle sua Revenda com o melhor sistema do Brasil</span>
            <div className="h-5 w-5 rounded-full bg-[#07090D]" />
          </div>

          <h2 className="bg-gradient-to-r text-transparent bg-clip-text from-cyan-300 to-blue-600 text-6xl font-extrabold mt-10">Sua Revenda ao seu Controle</h2>

          <p className="text-xl mt-10">Praticidade e Segurança são caracteristicas marcantes do Sistema Telesys</p>
          <p className="text-xl">Fácil e intuitivo, será um prazer controlar sua empresa.</p>

          <div className="mt-10 flex gap-4">
            <Button title="Assinar agora" />
            <Button title="Saiba mais" variant="OUTLINE" />
          </div>

          <div className="mt-16 max-h-[480px]">
            <Image src={HeroImg} alt="banner" className="max-h-[480px] w-auto rounded-3xl" />
          </div>

        </div>

        <section className="pt-30 max-w-[1200px] m-auto px-4">
          <TitleSection
            title="Precisa de ajuda?"
            description="Nossa equipe de suporte é treinada e está disponível para lhe ajudar no que for necessário"
            titleButtonSolid="Chamar Suporte"
            titleButtonOutline="Ver trinemanto"
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

            <div className="h-[420px] w-[650px] ">
              <div className="w-full h-full bg-gradient-to-tl to-sky-300 via-emerald-400 from-blue-700 rounded-2xl ">
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

        <section className="mt-30">

        </section>

      </main>

      <Footer />

      <IconWhatsapp />
    </div>
  );
}
