function resultado = caida_libre(v0, t, g, h, buscar)
    try
        % Declarar variables simbólicas
        syms sv0 st sg sh sv real

        % Ecuaciones del movimiento
        eq1 = sh == sv0 * st + (1/2) * sg * st^2; % altura
        eq2 = sv == sv0 + sg * st;               % velocidad final

        % Inicializar sustituciones
        sust = struct();

        if ~isnan(v0), sust.sv0 = v0; end
        if ~isnan(t),  sust.st  = t;  end
        if ~isnan(g),  sust.sg  = g;  end
        if ~isnan(h),  sust.sh  = h;  end

        % Seleccionar ecuación según lo que se desea buscar
        switch buscar
            case 'h'
                sol = solve(eq1, sh, 'Real', true);
            case 'v'
                sol = solve(eq2, sv, 'Real', true);
            case 't'
                sol = solve([eq1 eq2], st, 'Real', true);
            case 'g'
                sol = solve([eq1 eq2], sg, 'Real', true);
            otherwise
                resultado = 'Error: variable a buscar no válida';
                return;
        end

        if isempty(sol)
            resultado = 'No se encontró solución';
        else
            % Evaluar con los valores conocidos
            valor = double(subs(sol(1), sust));
            resultado = num2str(valor);  % Devolver como texto
        end

    catch ME
        resultado = ['Error al calcular caída libre: ' ME.message];
    end
end
