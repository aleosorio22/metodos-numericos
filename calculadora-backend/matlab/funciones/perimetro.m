function resultado = perimetro(figura, varargin)
    % Calcula el perímetro de figuras geométricas planas

    switch lower(figura)
        case 'cuadrado'
            lado = varargin{1};
            resultado = 4 * lado;

        case 'rectangulo'
            base = varargin{1};
            altura = varargin{2};
            resultado = 2 * (base + altura);

        case 'triangulo'
            lado1 = varargin{1};
            lado2 = varargin{2};
            lado3 = varargin{3};
            resultado = lado1 + lado2 + lado3;

        case 'circulo'
            radio = varargin{1};
            resultado = 2 * pi * radio;

        case 'trapecio'
            lado1 = varargin{1};
            lado2 = varargin{2};
            base_mayor = varargin{3};
            base_menor = varargin{4};
            resultado = lado1 + lado2 + base_mayor + base_menor;

        case 'paralelogramo'
            base = varargin{1};
            lado = varargin{2};
            resultado = 2 * (base + lado);

        otherwise
            resultado = 'Error: figura no reconocida';
    end
end
