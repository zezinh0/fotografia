import axios from 'axios';
import React, { useContext, useEffect, useState, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { data } from '../data';
import { Store } from '../Store';
import { Dialog, RadioGroup, Transition } from '@headlessui/react';
import { XIcon, ShieldCheckIcon, PauseIcon } from '@heroicons/react/outline';
import {
  StarIcon,
  QuestionMarkCircleIcon,
  CheckIcon,
} from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ImagesList() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [imagesselected, setImagesselected] = useState([]);
  const location = useLocation();
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [tam, setTamnahos] = useState([]);
  const [imagemEscolhida, setImagemEscolhida] = useState({});

  const [selectedSize, setSelectedSize] = useState();

  console.log(state);
  const addtoCartHandler = () => {
    tam.forEach((i) => {
      if (i.id === selectedSize) {
        const existItem = state.cart.cartItems.find(
          (x) =>
            x.esc_id === imagemEscolhida.esc_id &&
            x.esc_id_tamanho === i.esc_id_tamanho
        );
        console.log('trtrtrtr');
        console.log(existItem);
        let quantity = existItem ? existItem.quantity + 1 : 1;
        console.log(quantity);
        ctxDispatch({
          type: 'CART_ADD_ITEM',

          payload: {
            ...imagemEscolhida,
            quantity: quantity,
            esc_id_tamanho: i.id,
            esc_largura: i.largura,
            esc_altura: i.altura,
            esc_price: i.price,
          },
        });

        /*
        ctxDispatch({
          type: 'CART_ADD_ITEM',

          payload: {
            ...imagemEscolhida,
            quantity: 1,
            tamanho_id: tam.id_tamanho,
            la: tam.la,
            al: tam.al,
            pr: tam.pr,
          },
        });*/
      }
    });
  };

  useEffect(() => {
    const fetchData = async (codigo) => {
      //dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(`/api/imagens/imagens2/${codigo}`);
        // dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        console.log(result);
        setImages(result.data);
      } catch (error) {
        // dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData(state.cart.grupo);
  }, [state.cart.grupo]);

  const checkimage = (image) => {
    setImagemEscolhida({
      esc_id: image._id,
      esc_tam: image.imag_medidas,
      esc_caminho: image.imag_caminho.slice(53),
      esc_name: image.imag_name,
      esc_grupo: image.grupo_id,
    });
    setTamnahos(image.imag_medidas);

    setOpen(true);
  };

  return (
    <div className="bg-white">
      <div className="max-w-2x1 mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-4">
          {images.map((image) => (
            <div key={image._id} className="group">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <a onClick={() => checkimage(image)}>
                  <img
                    src={image.imag_caminho.slice(53)}
                    alt="Imagem Escolhida"
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                  />
                </a>
              </div>
              {/*<p className="mt-1 text-lg font-medium text-gray-900">
          ${image.price}
          </p>*/}
              {/*<div className="mt-6">
                {imagesselected.find((item) => item._id === image._id) ? (
                  <button className="relative flex mx-auto bg-red-300 border border-transparent rounded-md py-2 px-24 items-center justify-center text-sm font-medium text-gray-900 hover:bg-red-200">
                    Agora não quero!!!<span className="sr-only"></span>
                  </button>
                ) : (
                  <button
                    onClick={() => checkimage(image)}
                    className="relative flex mx-auto bg-green-300 border border-transparent rounded-md py-2 px-24 items-center justify-center text-sm font-medium text-gray-900 hover:bg-green-200"
                  >
                    Quero esta Imagem!!!<span className="sr-only"></span>
                  </button>
                )}
              </div> */}
            </div>
          ))}
        </div>
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="fixed z-10 inset-0 overflow-y-auto"
            onClose={setOpen}
          >
            <div
              className="flex min-h-screen text-center md:block md:px-2 lg:px-4"
              style={{ fontSize: 0 }}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="hidden md:inline-block md:align-middle md:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
                  <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="py-10 w-full grid grid-cols-1 gap-y-1 sm:grid-cols-1 gap-x-1 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-1">
                      <div className=" lg:col-start-2 lg:col-span-2 xl:col-start-2 xl:col-span-4  w-fit h-fit  bg-gray-200 rounded-lg overflow-hidden ">
                        <div className=" rounded-lg bg-gray-100 overflow-hidden">
                          <img
                            src={imagemEscolhida.esc_caminho}
                            alt="Imagem Escolhida"
                            className="object-center object-cover"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-8 lg:col-span-7">
                        <section
                          aria-labelledby="options-heading"
                          className="mt-6"
                        >
                          <h3 id="options-heading" className="sr-only">
                            Product options
                          </h3>

                          <form>
                            <div className="sm:flex sm:justify-between">
                              {/* Size selector */}
                              <RadioGroup
                                value={selectedSize}
                                onChange={setSelectedSize}
                              >
                                <RadioGroup.Label className="block text-lg font-medium text-gray-700">
                                  Escolha o Tamanho da Imagem:
                                </RadioGroup.Label>
                                <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                  {tam.map((size) => (
                                    <RadioGroup.Option
                                      as="div"
                                      key={size.id}
                                      value={size.id}
                                      className={({ active }) =>
                                        classNames(
                                          active
                                            ? 'ring-2 ring-indigo-500'
                                            : '',
                                          'relative block border border-gray-300 rounded-lg p-4 cursor-pointer focus:outline-none'
                                        )
                                      }
                                    >
                                      {({ active, checked }) => (
                                        <>
                                          <RadioGroup.Label
                                            as="p"
                                            className="text-base font-medium text-gray-900"
                                          >
                                            {size.price}€
                                          </RadioGroup.Label>
                                          <RadioGroup.Description
                                            as="p"
                                            className="mt-1 text-sm text-gray-500"
                                          >
                                            {'Tamanho da Imagem: ' +
                                              size.largura +
                                              ' cm X ' +
                                              size.altura +
                                              ' cm'}
                                          </RadioGroup.Description>
                                          <div
                                            className={classNames(
                                              active ? 'border' : 'border-2',
                                              checked
                                                ? 'border-indigo-500'
                                                : 'border-transparent',
                                              'absolute -inset-px rounded-lg pointer-events-none'
                                            )}
                                            aria-hidden="true"
                                          />
                                        </>
                                      )}
                                    </RadioGroup.Option>
                                  ))}
                                </div>
                              </RadioGroup>
                            </div>

                            <div className="mt-6">
                              <button
                                type="submit"
                                className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                                onClick={() => addtoCartHandler()}
                              >
                                Add to bag
                              </button>
                            </div>
                            <div className="mt-6 text-center">
                              <a
                                href="#"
                                className="group inline-flex text-base font-medium"
                              >
                                <ShieldCheckIcon
                                  className="flex-shrink-0 mr-2 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                                <span className="text-gray-500 group-hover:text-gray-700">
                                  Lifetime Guarantee
                                </span>
                              </a>
                            </div>
                          </form>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  );
}
