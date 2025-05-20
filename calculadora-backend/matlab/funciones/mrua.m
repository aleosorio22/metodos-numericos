function resultado = mrua(x0, v0, a, t, v, x, buscar)
    try
        syms sx0 sv0 sa st sv sx real

        % Ecuaciones del MRUA
        eqs = [
            sv == sv0 + sa * st;
            sx == sx0 + sv0 * st + (1/2) * sa * st^2;
            sv^2 == sv0^2 + 2 * sa * (sx - sx0)
        ];

        % Asignar valores si no están vacíos
        if ~isempty(x0), sx0 = x0; end
        if ~isempty(v0), sv0 = v0; end
        if ~isempty(a),  sa = a;  end
        if ~isempty(t),  st = t;  end
        if ~isempty(v),  sv = v;  end
        if ~isempty(x),  sx = x;  end

        % Mapa de variables simbólicas
        vars = struct( ...
            "sx0", sx0, "sv0", sv0, "sa", sa, ...
            "st", st, "sv", sv, "sx", sx ...
        );

        if ~isfield(vars, buscar)
            resultado = "Error: Variable buscada no válida";
            return;
        end

        % Obtener la variable simbólica a despejar
        target = vars.(buscar);

        % Resolver
        sol = solve(eqs, target, 'Real', true);

        if isempty(sol)
            resultado = "No se encontró solución";
        else
            resultado = char(sol(1));  % Convertir solo un valor a string
        end
    catch ME
        resultado = ['Error al calcular MRUA: ' ME.message];
    end
end
