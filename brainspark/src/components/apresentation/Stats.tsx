export default function Stats() {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Resultados Comprovados
            </h2>
            <p className="text-lg text-gray-600">
              Veja como nossos usuários melhoraram seus estudos
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">87%</div>
              <div className="text-gray-600">Melhoria nas notas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">3.5h</div>
              <div className="text-gray-600">Economia de tempo/dia</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">92%</div>
              <div className="text-gray-600">Aprovação em concursos</div>
            </div>
            {/* <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">15K+</div>
              <div className="text-gray-600">Estudantes aprovados</div>
            </div> */}
          </div>
        </div>
      </section>
    )
}