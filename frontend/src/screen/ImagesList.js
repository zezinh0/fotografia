import axios from 'axios';
import React, { useContext, useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import { Dialog, RadioGroup, Transition } from '@headlessui/react';
import { XIcon, ShieldCheckIcon } from '@heroicons/react/outline';
import { Watermark } from '@hirohe/react-watermark';
import Header from './Header';
import Footer from './Footer';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ImagesList() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [tam, setTamanhos] = useState([]);
  const [imagemEscolhida, setImagemEscolhida] = useState({});
  const [download, setDownload] = useState({});
  const [selectedSize, setSelectedSize] = useState('');

  const addtoCartHandler = () => {
    if (
      download.grupo_download === true &&
      download.grupo_download_id === selectedSize
    ) {
      ctxDispatch({
        type: 'CART_ADD_ITEM_DOWNLOAD',

        payload: {
          ...imagemEscolhida,
          quantity: 1,
          esc_id_tamanho: download.grupo_download_id,

          esc_price: download.grupo_download_price,
        },
      });
    } else {
      const esc_id_tamanho = tam.find((item) => item.id === selectedSize);
      ctxDispatch({
        type: 'CART_ADD_ITEM',

        payload: {
          ...imagemEscolhida,
          quantity: 1,
          esc_id_tamanho: esc_id_tamanho.id,
          esc_largura: esc_id_tamanho.largura,
          esc_altura: esc_id_tamanho.altura,
          esc_price: esc_id_tamanho.price,
          esc_download: false,
        },
      });
    }

    {
      /*
  for (const element of state.cart.cartItems) {
      if (element.esc_id === imagemEscolhida.esc_id) {
        let item = element;
        console.log('AQUI');
        console.log(item);
        console.log(imagemEscolhida.esc_tam[0]);
        console.log('AQUI');
        for (const element2 of imagemEscolhida.esc_tam) {
          if (element2.id === item.esc_id_tamanho) {
            item.quantity = item.quantity + 1;
            console.log('AQUI 2');
            console.log(item);
          }
        }
      }
    }
  
  */
    }

    {
      /* 
    tam.forEach((i) => {
      if (i.id === selectedSize) {
        console.log('Entrei');
        console.log(selectedSize);
        console.log(imagemEscolhida.esc_id);
        let existItem = {};
        for (const item of state.cart.cartItems) {
          console.log('IDDDDDDD');
          console.log(item.esc_id);
          console.log(imagemEscolhida.esc_id);
          console.log('Tamanho');
          console.log(item.esc_id_tamanho);
          console.log(i.esc_id_tamanho);
          if (
            item.esc_id === imagemEscolhida.esc_id &&
            item.esc_id_tamanho === i.esc_id_tamanho
          ) {
            console.log('Estou AQUI');
            existItem = item;
          }
        }

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
      }
    });
    */
    }

    setSelectedSize('');
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async (codigo) => {
      //dispatch({ type: 'FETCH_REQUEST' });
      console.log('ESTOU AQUI');
      console.log(codigo);
      try {
        const result = await axios.get(`/api/imagens/imagens2/${codigo}`);
        // dispatch({ type: 'FETCH_SUCCESS', payload: result.data });

        setImages(result.data);
      } catch (error) {
        // dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData(state.cart.grupo.grupo_id);
  }, [state.cart.grupo.grupo_id]);

  const checkimage = (image) => {
    setImagemEscolhida({
      esc_id: image._id,
      esc_caminho: image.imag_caminho.slice(53),
      esc_grupo: image.grupo_id,
    });
    console.log('OKOKOKK');
    console.log(imagemEscolhida);
    setTamanhos(image.imag_medidas);
    setDownload({
      grupo_download: image.grupo_download,
      grupo_download_id: image.grupo_download_id,
      grupo_download_price: image.grupo_download_price,
    });
    setSelectedSize('');
    setOpen(true);
  };
  console.log(selectedSize);
  return (
    <div>
      <Header />
      <div className="bg-white">
        <div className="max-w-2x1 mx-auto py-16 px-4 sm:py-18 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className=" grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {images.map((image, idx) => (
              <div>
                <div key={idx} className="group">
                  <div className="w-full  bg-gray-200 rounded-lg overflow-hidden aspect-w-12 aspect-h-12">
                    <button onClick={() => checkimage(image)}>
                      <Watermark show="false" text="Mark" opacity="0.5">
                        <img
                          src={image.imag_caminho.slice(53)}
                          alt="Imagem Escolhida"
                          className="w-full h-full object-center object-cover group-hover:opacity-75"
                        />
                      </Watermark>
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-indigo-300" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-2 bg-white text-sm text-indigo-500">
                      {idx + 1}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Transition.Root show={open} as={Fragment}>
            <Dialog
              as="div"
              className="fixed z-10 inset-0 overflow-y-auto"
              onClose={setOpen}
            >
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all my-8 sm:align-top max-w-md w-full ">
                    <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                      <button
                        type="button"
                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="object-fill h-auto  w-auto pb-1 pt-8 pl-20 pr-20">
                      <div className=" ">
                        <Watermark text="Mark" opacity="0.8">
                          <img
                            src={imagemEscolhida.esc_caminho}
                            alt="Imagem Escolhida"
                            className=""
                          />
                        </Watermark>
                      </div>
                    </div>
                    <form>
                      <div className="sm:flex sm:justify-between">
                        {/* Size selector */}
                        <RadioGroup
                          value={selectedSize}
                          onChange={setSelectedSize}
                        >
                          <RadioGroup.Label className="pt-4 block text-md font-medium text-gray-700">
                            Sent Home:
                          </RadioGroup.Label>
                          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
                            {tam.map((size, idx2) => (
                              <RadioGroup.Option
                                as="div"
                                key={idx2}
                                value={size.id}
                                className={({ active }) =>
                                  classNames(
                                    active ? 'ring-2 ring-indigo-500' : '',
                                    'relative block border border-gray-300 rounded-lg p-2 cursor-pointer focus:outline-none'
                                  )
                                }
                              >
                                {({ active, checked }) => (
                                  <>
                                    <RadioGroup.Label
                                      as="p"
                                      className="text-base text-center font-medium text-gray-900"
                                    >
                                      {size.price}€
                                    </RadioGroup.Label>

                                    <RadioGroup.Description
                                      as="p"
                                      className="mt-1 text-sm text-center text-gray-500"
                                    >
                                      {'Size: ' +
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
                          {download.grupo_download === true ? (
                            <div>
                              {' '}
                              <RadioGroup.Label className="pt-4 block text-md font-medium text-gray-700">
                                Download:
                              </RadioGroup.Label>
                              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <RadioGroup.Option
                                  as="div"
                                  key={download.grupo_download_id}
                                  value={download.grupo_download_id}
                                  className={({ active }) =>
                                    classNames(
                                      active ? 'ring-2 ring-indigo-500' : '',
                                      'relative block border border-gray-300 rounded-lg p-2 cursor-pointer focus:outline-none'
                                    )
                                  }
                                >
                                  {({ active, checked }) => (
                                    <>
                                      <RadioGroup.Label
                                        as="p"
                                        className="text-base text-center font-medium text-gray-900"
                                      >
                                        {download.grupo_download_price} €
                                      </RadioGroup.Label>
                                      <RadioGroup.Description
                                        as="p"
                                        className="mt-1 text-sm text-center text-gray-500"
                                      >
                                        Download
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
                              </div>
                            </div>
                          ) : null}
                        </RadioGroup>
                      </div>

                      <div className="mt-6">
                        {selectedSize !== '' ? (
                          <button
                            type="submit"
                            className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                            onClick={() => {
                              addtoCartHandler();
                            }}
                          >
                            Add to bag
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                            disabled
                          >
                            Add to bag
                          </button>
                        )}
                      </div>
                      <div className="mt-4 text-center">
                        <Link
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
                        </Link>
                      </div>
                    </form>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      </div>
      <Footer />
    </div>
  );
}
