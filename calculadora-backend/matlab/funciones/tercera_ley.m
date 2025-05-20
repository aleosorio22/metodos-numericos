function resultado = tercera_ley(f_accion, buscar)
    try
        syms Faccion Freaccion real

        eq = Freaccion == -Faccion;

        sust = struct();
        if ~isnan(f_accion)
            sust.Faccion = f_accion;
        end

        switch buscar
            case 'reaccion'
                sol = solve(eq, Freaccion, 'Real', true);
            case 'accion'
                sol = solve(eq, Faccion, 'Real', true);
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
        resultado = ['Error al calcular tercera ley: ' ME.message];
    end
end
