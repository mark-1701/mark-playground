const UnsupportedScreen = () => {
  return (
    <div className="flex h-dvh items-center justify-center p-8 lg:hidden">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold">Pantalla no compatible</h1>

        <p className="mt-4 text-gray-600">
          Esta aplicación está diseñada para utilizarse en computadoras o
          pantallas de mayor tamaño.
        </p>

        <p className="mt-2 text-gray-600">
          Si estás en un teléfono o una tablet, intenta acceder desde un equipo
          de escritorio o amplía el tamaño de la ventana.
        </p>
      </div>
    </div>
  );
};

export default UnsupportedScreen;
