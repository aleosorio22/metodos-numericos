function resultado = volumen(figura, varargin)
    % Calcula el volumen de diferentes figuras geométricas
    % figura: 'cubo', 'esfera', 'cilindro', 'cono', 'prisma'
    % varargin: parámetros necesarios según la figura

    switch lower(figura)
        case 'cubo'
            lado = varargin{1};
            resultado = lado^3;

        case 'esfera'
            radio = varargin{1};
            resultado = (4/3) * pi * radio^3;

        case 'cilindro'
            radio = varargin{1};
            altura = varargin{2};
            resultado = pi * radio^2 * altura;

        case 'cono'
            radio = varargin{1};
            altura = varargin{2};
            resultado = (1/3) * pi * radio^2 * altura;

        case 'prisma'
            largo = varargin{1};
            ancho = varargin{2};
            altura = varargin{3};
            resultado = largo * ancho * altura;

        otherwise
            resultado = 'Error: figura no reconocida';
    end
end
