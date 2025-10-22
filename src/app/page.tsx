'use client'

import { Button } from "./components/Button";
import Header from "./components/Header";
import Image from "next/image";

import HeroImg from '../../public/hero1.png'
import Pro from '../../public/pro.svg'
import Premium from '../../public/premium.svg'
import Basic from '../../public/basic.svg'

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
import { PiCheckCircle, PiClockFill, PiNoteFill, PiWhatsappLogoFill } from "react-icons/pi";
import { FaWhatsapp } from "react-icons/fa";
import { Element } from 'react-scroll';
import { CardVideo } from "./components/CardVideo";
import Script from "next/script";
import { faqJsonLd, softwareAppJsonLd } from "@/lib/jsonld";

const tabs = [
  { img: Banner1 },
  { img: Banner2 },
  { img: Banner3 },
]

const basic = [
  { id: 11, title: 'Gerenciamento de Cliente' },
  { id: 12, title: 'Suporte Técnico' },
  { id: 13, title: 'Uso de Bina' },


]

const pro = [
  { id: 1, title: 'Tudo do Plano Basic' },
  { id: 2, title: 'Mais de 50 Relatórios' },
  { id: 3, title: 'Controle Financeiro' },
  { id: 4, title: 'Gestão de Estoque' },
  { id: 5, title: 'Gestão de Usuário' },
]

const premium = [
  { id: 6, title: 'Tudo do Plano Pro' },
  { id: 7, title: 'Integração com Telefonia' },
  { id: 8, title: 'Hospedagem na Núvem' },
  { id: 9, title: 'Backups Automáticos' },
  { id: 10, title: 'Rastreio GPS' },
]

export default function Home() {
  const [index, setIndex] = useState(0)
  const [showPromotion, setShowPromotion] = useState(true)

  const faqs = [
    {
      question: "O Telesys funciona para qualquer porte de revenda?",
      answer: "Sim. Atendemos desde pequenas revendas até operações com múltiplas rotas e equipes."
    },
    {
      question: "Consigo controlar estoque e entregas?",
      answer: "Sim. Há módulos dedicados para estoque, pedidos, roteirização e conferência de entregas."
    },
  ];

  return (
    <>

      <Script
        id="jsonld-software-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd()) }}
      />
      <Script
        id="jsonld-faq-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />

      <div className=" ">
        <Header showPromotion={showPromotion} setShowPromotion={setShowPromotion} />

        <main className={` m-auto  text-center `} >
          <section className={` m-auto ${showPromotion ? 'md:pt-40 pt-44' : 'pt-20'} text-center `} id="home">
            <div className="flex flex-col items-center justify-center mt-20 max-w-[1200px] m-auto" >

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
          </section>

          <section className="max-w-[1200px] m-auto px-4">
            <Features />
          </section>

          <Element name="suporte">
            <section className={` ${showPromotion ? 'pt-56 md:pt-40' : 'pt-30'} max-w-[1200px] m-auto px-4`} id="suporte">
              <TitleSection
                title="Precisa de ajuda?"
                description="Nossa equipe de suporte é treinada e está disponível para lhe ajudar no que for necessário"
                titleButtonSolid="Chamar Suporte"
                icon={<FaWhatsapp size={24} />}
                titleButtonOutline="Ver treinamento"
                buttons
                hRefButtonSolid="https://wa.me/5531984372245"
                hRefButtonOutline="https://youtube.com/netxpertbr"
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
          </Element>


          <section className="pt-56 w-full relative z-0">
            {/* <Testimonial /> */}
            <Slider />
          </section>

          <section className="pt-30 pb-20 max-w-[1200px] m-auto px-4">
            <TitleSection
              title="Veja um pouco do Telesys"
              description="Veja alguns vídeos do Sistema Telesys em funcionamento e como você pode ser eficiente no controle da sua revenda"

            />

            <CardVideo />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 justify-center mt-20 px-4">

              <div className="flex justify-center">
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
              </div>

              <div className="flex justify-center">
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
              </div>

              <div className="flex justify-center">
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

            </div>

          </section>

          <section className={`${showPromotion ? 'pt-56 md:pt-40' : 'pt-30'} pb-20 max-w-[1200px] m-auto px-4`} id="modulos">
            <TitleSection
              title="Planos do Telesys"
              description="Conheça nossos planos e módulos e veja o que mais se adapta com a 
            sua Revenda de Gás"
            />

            <div className="flex mt-20 justify-start lg:justify-center gap-6 overflow-x-scroll md:overflow-auto pt-6">

              <div>
                <div className="relative w-[304px] h-[534px] overflow-hidden rounded-2xl border border-[#1e252b]">
                  <div className="absolute w-[304px] h-[534px] bg-gradient-to-bl blur-2xl opacity-40">
                  </div>

                  <div className="relative z-[1] flex flex-col items-start py-10 px-6">
                    <div className="border w-fit border-[#6b7277] rounded-full p-1 pr-3 flex items-center gap-2 bg-gradient-to-r from-emerald-500/50 to-75% ">
                      <Image src={Basic} alt="" />
                      <h5 className="font-semibold">BASIC</h5>
                    </div>

                    <h3 className="mt-5 text-4xl text-white">Consulte</h3>

                    <p className="text-left mt-2 text-white/50 max-w-3/4">
                      Se você quer apenas lançar as suas vendas no sistema e usar a bina.
                    </p>

                    <Link className='w-full' href={'https://wa.me/553184372245'} target="_blank">
                      <button className="bg-white/10 text-white w-full py-2 rounded-full mt-6 hover:cursor-pointer hover:scale-105 transition-all ease-in-out">
                        Assinar
                      </button>
                    </Link>

                    <div className="flex flex-col mt-7 gap-4">
                      {
                        basic.map(item => {
                          return (

                            <div key={item.id} className={`flex items-center gap-4 text-[#1e252b] `}>
                              <PiCheckCircle size={24} />

                              <p className={` ${'text-white'}`}>{item.title}</p>
                            </div>
                          )
                        })
                      }

                    </div>


                  </div>

                </div>
              </div>

              <div>
                <div className="relative w-[304px] flex justify-center">
                  <div className="absolute z-10 px-4 -top-[20px] w-fit py-2 rounded-full shadow-lg/30 shadow-[#07090D] bg-gradient-to-bl from-cyan-600 to-blue-900">
                    <h5>MAIS POPULAR</h5>
                  </div>
                </div>

                <div className="relative w-[304px] h-[534px] overflow-hidden rounded-2xl border border-[#1e252b]">
                  <div className="absolute w-[304px] h-[534px] bg-gradient-to-bl blur-2xl from-cyan-600 to-blue-900 opacity-40">
                  </div>

                  <div className="relative z-[1] flex flex-col items-start py-10 px-6">
                    <div className="border w-fit border-[#6b7277] rounded-full p-1 pr-3 flex items-center gap-2 bg-white/20 ">
                      <Image src={Pro} alt="" />
                      <h5 className="font-semibold">PRO</h5>
                    </div>

                    <h3 className="mt-5 text-4xl text-white">Consulte</h3>

                    <p className="text-left mt-2 text-white/50 max-w-3/4">
                      Perfeito para quem quer ter controle e praticidade com emissão fiscal.
                    </p>

                    <Link className='w-full' href={'https://wa.me/553184372245'} target="_blank">
                      <button className="bg-white text-[#07090D] w-full py-2 rounded-full mt-6 hover:cursor-pointer hover:scale-105 transition-all ease-in-out">
                        Assinar
                      </button>
                    </Link>

                    <div className="flex flex-col mt-7 gap-4">
                      {
                        pro.map(item => {
                          return (

                            <div key={item.id} className={`flex items-center gap-4 ${item.id === 1 ? 'text-sky-400/30' : 'text-[#43628a]'} `}>
                              <PiCheckCircle size={24} />

                              <p className={`${item.id === 1 ? 'font-bold text-sky-400' : 'text-white'}`}>{item.title}</p>
                            </div>
                          )
                        })
                      }

                    </div>


                  </div>

                </div>
              </div>

              <div>
                <div className="relative w-[304px] h-[534px] overflow-hidden rounded-2xl border border-[#1e252b]">
                  <div className="absolute w-[304px] h-[534px] bg-gradient-to-bl blur-2xl opacity-40">
                  </div>

                  <div className="relative z-[1] flex flex-col items-start py-10 px-6">
                    <div className="border w-fit border-[#6b7277] rounded-full p-1 pr-3 flex items-center gap-2 bg-gradient-to-r from-blue-700/50 to-75% ">
                      <Image src={Premium} alt="" />
                      <h5 className="font-semibold">PREMIUM</h5>
                    </div>

                    <h3 className="mt-5 text-4xl text-white">Consulte</h3>

                    <p className="text-left mt-2 text-white/50 max-w-3/4">
                      Se você quer ter acesso a todos os módulo essa é a melhor opção.
                    </p>
                    <Link className='w-full' href={'https://wa.me/553184372245'} target="_blank">
                      <button className="bg-white/10 text-white w-full py-2 rounded-full mt-6 hover:cursor-pointer hover:scale-105 transition-all ease-in-out">
                        Assinar
                      </button>
                    </Link>

                    <div className="flex flex-col mt-7 gap-4">
                      {
                        premium.map(item => {
                          return (

                            <div key={item.id} className={`flex items-center gap-4 text-[#1e252b] ${item.id === 6 && 'text-sky-500/30'}`}>
                              <PiCheckCircle size={24} />

                              <p className={` ${item.id === 6 ? 'font-bold text-sky-500' : 'text-white'}`}>{item.title}</p>
                            </div>
                          )
                        })
                      }

                    </div>


                  </div>

                </div>
              </div>
            </div>
          </section>

          <section className={`${showPromotion ? 'pt-56 md:pt-40' : 'pt-30'} relative pb-20 max-w-[1200px] m-auto px-4 mb-10`} id="testar">
            <TitleSection
              title="Quero Testar o Sistema"
              description="Comece hoje e simplifique a gestão da sua Revenda. Sem compromisso e com suporte humanizado."
              titleButtonSolid="Testar o Sistema Agora"
              buttons
            />

            <div className="flex justify-center mt-10">
              <Link href={'https://wa.me/553184372245'} target="_blank">
                <Button title="Testar o sistema agora por 7 dias" />
              </Link>
            </div>


            <div className="absolute top-[350px] left-0 right-0 -z-10 h-[590px] bg-[url(../../public/bgFinal.png)] bg-cover bg-center bg-no-repeat mx-4 min-[1200px]:mx-0 rounded-br-4xl rounded-bl-4xl">
            </div>

            {/* <div className="mt-[80px] md:mt-[140px] flex justify-center gap-4 mx-4 mask-alpha mask-l-from-black mask-l-from-90% mask-r-from-black mask-r-from-90%">

            <div className="min-[1200px]:flex justify-center hidden">
              <div className=" px-8 py-6 bg-white/20 w-fit rounded-2xl">

                <div className="w-[200px] text-left">
                  <h1 className="font-bold text-xl">Pocket</h1>
                </div>

                <div className="w-[300px] text-left mt-4 mb-10">
                  <p>{'"'}The automation from design to code
                    with Specify is incredibly powerful. The
                    ability to reference the same tokens and
                    assets in Figma — and in our codebase —
                    saves us an incredible amount of time,
                    while reducing manual, error-prone work.{'"'}</p>
                </div>
              </div>
            </div>

            <div className="min-[800px]:flex justify-center hidden">
              <div className="  px-8 py-6 bg-white/20 w-fit rounded-2xl">
                <div className="w-[200px] text-left">
                  <h1 className="font-bold text-xl">Pocket</h1>
                </div>

                <div className="w-[300px] text-left mt-4 mb-10">
                  <p>{'"'}The automation from design to code
                    with Specify is incredibly powerful. The
                    ability to reference the same tokens and
                    assets in Figma — and in our codebase —
                    saves us an incredible amount of time,
                    while reducing manual, error-prone work.{'"'}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="  px-8 py-6 bg-white/20 w-fit rounded-2xl">
                <div className="w-[200px] text-left">
                  <h1 className="font-bold text-xl">Pocket</h1>
                </div>

                <div className="w-[300px] text-left mt-4 mb-10">
                  <p>{'"'}The automation from design to code
                    with Specify is incredibly powerful. The
                    ability to reference the same tokens and
                    assets in Figma — and in our codebase —
                    saves us an incredible amount of time,
                    while reducing manual, error-prone work.{'"'}</p>
                </div>
              </div>
            </div>

          </div> */}

            <div className="mt-[400px]"></div>

          </section>

        </main>

        <Footer />

        <IconWhatsapp />

        <Banner />
      </div>
    </>
  );
}
