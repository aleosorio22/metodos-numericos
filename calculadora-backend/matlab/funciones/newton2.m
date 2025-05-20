function resultado = newton2(F, m, a, buscar)
    try
        % Declarar variables simbólicas con nombres únicos
        syms f_sym m_sym a_sym real

        % Ecuación principal
        eq = f_sym == m_sym * a_sym;

        % Inicializar sustituciones
        sust = struct();
        if ~isnan(F), sust.f_sym = F; end
        if ~isnan(m), sust.m_sym = m; end
        if ~isnan(a), sust.a_sym = a; end

        % Seleccionar qué variable calcular
        switch buscar
            case 'F'
                sol = solve(eq, f_sym, 'Real', true);
            case 'm'
                sol = solve(eq, m_sym, 'Real', true);
            case 'a'
                sol = solve(eq, a_sym, 'Real', true);
            otherwise
                resultado = 'Error: variable a buscar no válida';
                return;
        end

        if isempty(sol)
            resultado = 'No se encontró solución';
        else
            valor = double(subs(sol(1), sust));
            resultado = num2str(valor);
        end

    catch ME
        resultado = ['Error al calcular Segunda Ley: ' ME.message];
    end
end
