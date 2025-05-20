function resultado = graficar(f_str, variable, a, b, nombre_archivo)
    % Grafica la función f_str en el intervalo [a, b]
    % Guarda la imagen en un archivo PNG
    % nombre_archivo: sin extensión

    try
        syms x y z t
        f = str2sym(f_str);
        var = str2sym(variable);

        fplot(f, [a, b], 'LineWidth', 2);
        grid on;
        title(['Gráfica de ', f_str]);
        xlabel(char(var));
        ylabel('f(x)');

        ruta = fullfile('graficas', [nombre_archivo '.png']);
        saveas(gcf, ruta);
        close;

        resultado = ['Imagen guardada en ', ruta];
    catch
        resultado = 'Error al graficar función';
    end
end
