function resultado = potencia(base, exponente)
    % Calcula base elevada al exponente
    % base: número base
    % exponente: potencia

    try
        resultado = base ^ exponente;
    catch
        resultado = 'Error al calcular la potencia';
    end
end
