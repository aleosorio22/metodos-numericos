function resultado = ejecutar(funcion, varargin)
    % Agrega la carpeta de funciones al path
    addpath('funciones');

    % Verifica que la función exista
    if exist(funcion, 'file') ~= 2
        resultado = 'Error: La función no existe';
        return;
    end

    % Intenta llamar la función con los parámetros dados
    try
        fhandle = str2func(funcion);
        resultado = fhandle(varargin{:});
    catch ME
        resultado = ['Error al ejecutar función: ' ME.message];
    end
end
