function resultado = area(figura, varargin)
    % Calcula el área de figuras planas
    % figura: nombre de la figura
    % varargin: parámetros requeridos según la figura

    switch lower(figura)
        case 'cuadrado'
            lado = varargin{1};
            resultado = lado^2;

        case 'rectangulo'
            base = varargin{1};
            altura = varargin{2};
            resultado = base * altura;

        case 'triangulo'
            base = varargin{1};
            altura = varargin{2};
            resultado = (base * altura) / 2;

        case 'circulo'
            radio = varargin{1};
            resultado = pi * radio^2;

        case 'trapecio'
            base_mayor = varargin{1};
            base_menor = varargin{2};
            altura = varargin{3};
            resultado = ((base_mayor + base_menor) * altura) / 2;

        case 'paralelogramo'
            base = varargin{1};
            altura = varargin{2};
            resultado = base * altura;

        otherwise
            resultado = 'Error: figura no reconocida';
    end
end