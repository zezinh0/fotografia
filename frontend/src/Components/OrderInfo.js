import React from 'react';

export default function OrderInfo(props) {
  const encomenda = props.encomenda;
  console.log('AAAAAAAAAAAAA');
  console.log(encomenda);
  return (
    <div>
      {encomenda.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:pb-24 lg:px-8">
          <div className="mt-16">
            <h2 className="sr-only">Recent orders</h2>

            <div className="space-y-20">
              <div>
                <div className="bg-gray-50 rounded-lg  px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8">
                  <dl className="divide-y divide-gray-200 space-y-6 text-sm text-gray-600 flex-auto sm:divide-y-0 sm:space-y-2 sm:grid sm:grid-cols-2 sm:gap-x-3 lg:w-1/1 lg:flex-none lg:gap-x-10">
                    <div className="flex justify-between sm:block">
                      <dt className="font-medium text-gray-900">
                        Data da Encomenda:
                      </dt>
                      <dd className="sm:mt-1">
                        {encomenda[0].info.createdAt.slice(0, 10)}
                      </dd>
                    </div>
                    <div className="flex justify-between pt-4 sm:block sm:pt-0">
                      <dt className="font-medium text-gray-900">
                        Número do Pedido:
                      </dt>
                      <dd className="sm:mt-1">{encomenda[0].info.enco_num}</dd>
                    </div>
                    <div className="flex justify-between pt-4 sm:block sm:pt-0">
                      <dt className="font-medium text-gray-900">Nome:</dt>
                      <dd className="sm:mt-1">
                        {encomenda[0].info.enco_namepro}{' '}
                        {encomenda[0].info.enco_nameapl}
                      </dd>
                    </div>
                    <div className="flex justify-between pt-4 sm:block sm:pt-0">
                      <dt className="font-medium text-gray-900">Email:</dt>
                      <dd className="sm:mt-1">
                        {encomenda[0].info.enco_email}
                      </dd>
                    </div>
                    <div className="flex justify-between pt-4 sm:block sm:pt-0">
                      <dt className="font-medium text-gray-900">Telemóvel:</dt>
                      <dd className="sm:mt-1">
                        {encomenda[0].info.enco_telemovel}
                      </dd>
                    </div>
                    <div className="flex justify-between pt-4 sm:block sm:pt-0">
                      <dt className="font-medium text-gray-900">Morada: </dt>
                      <dd className="sm:mt-1">
                        {encomenda[0].info.enco_morada}
                      </dd>
                    </div>
                    <div className="flex justify-between pt-4 sm:block sm:pt-0">
                      <dt className="font-medium text-gray-900">
                        Código Postal:
                      </dt>
                      <dd className="sm:mt-1">
                        {encomenda[0].info.enco_postal}
                      </dd>
                    </div>
                    <div className="flex justify-between pt-4 sm:block sm:pt-0">
                      <dt className="font-medium text-gray-900">Cidade:</dt>
                      <dd className="sm:mt-1">
                        {encomenda[0].info.enco_cidade}
                      </dd>
                    </div>
                    <div className="flex justify-between pt-4 sm:block sm:pt-0">
                      <dt className="font-medium text-gray-900">País:</dt>
                      <dd className="sm:mt-1">{encomenda[0].info.enco_pais}</dd>
                    </div>
                    <div className="flex justify-between pt-4 sm:block sm:pt-0">
                      <dt className="font-medium text-gray-900">Método:</dt>
                      <dd className="sm:mt-1">
                        {encomenda[0].info.enco_metodoEt}
                      </dd>
                    </div>
                    <div className="flex justify-between pt-4 sm:block sm:pt-0">
                      <dt className="font-medium text-gray-900">Total:</dt>
                      <dd className="sm:mt-1">
                        {encomenda[0].info.enco_preco} €
                      </dd>
                    </div>
                  </dl>
                </div>

                <table className="mt-4 w-full text-gray-500 sm:mt-6">
                  <caption className="sr-only">Products</caption>
                  <thead className="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
                    <tr>
                      <th
                        scope="col"
                        className="sm:w-2/5 lg:w-1/3 pr-8 py-3 font-normal"
                      >
                        Imagem
                      </th>
                      <th
                        scope="col"
                        className="hidden w-1/5 pr-8 py-3 font-normal sm:table-cell text-right"
                      >
                        Tamanho
                      </th>
                      <th
                        scope="col"
                        className="hidden pr-8 py-3 font-normal sm:table-cell text-right"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
                    {encomenda[0].imagens.map((imagem, i) => (
                      <tr key={i}>
                        <td className="py-6 pr-8">
                          <div className="flex items-center">
                            <img
                              src={imagem.caminho.slice(53)}
                              alt="Imagem Encomendada"
                              className="w-16 h-16 object-center object-cover rounded mr-6"
                            />
                            <div>
                              <div className="font-medium text-gray-900">
                                {imagem.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="hidden py-6 pr-8 sm:table-cell text-right">
                          {imagem.tamanho}
                        </td>
                        <td className="hidden py-6 pr-8 sm:table-cell text-right">
                          {'incompleted' === 'incompleted' ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-300 text-red-800">
                              Incomplete
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-300 text-green-800">
                              Completed
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>okokok</div>
      )}
    </div>
  );
}
