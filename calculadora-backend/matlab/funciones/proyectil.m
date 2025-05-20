function resultado = proyectil(v0, angulo, g, buscar)
    try
        % Conversión de ángulo a radianes
        theta = deg2rad(angulo);

        % Fórmulas simbólicas
        syms R H T real
        R = (v0^2 * sin(2*theta)) / g;
        H = (v0^2 * (sin(theta))^2) / (2 * g);
        T = (2 * v0 * sin(theta)) / g;

        switch buscar
            case 'R'
                resultado = char(vpa(R, 4));
            case 'H'
                resultado = char(vpa(H, 4));
            case 'T'
                resultado = char(vpa(T, 4));
            otherwise
                resultado = 'Error: variable a buscar no válida';
        end
    catch ME
        resultado = ['Error al calcular proyectil: ' ME.message];
    end
end
