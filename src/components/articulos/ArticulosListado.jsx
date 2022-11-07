import React from "react";
import moment from "moment";

export default function ArticulosListado ({Items, Consultar, Modificar, ActivarDesactivar, Imprimir, Pagina, RegistrosTotal, Paginas, Buscar}) {
    // mejorar performance
    // console.log("render ArticulosListado", [Items]); //para ver cuando se renderiza y luego mejoramos con el  hoock useMemo
    return (
      <>
        <table className="table table-hover table-sm table-bordered table-striped">
          <thead>
            <tr>
              <th className="text-center">Nombre</th>
              <th className="text-center">Precio</th>
              <th className="text-center">Stock</th>
              <th className="text-center">Fecha de Alta</th>
              <th className="text-center">Activo</th>
              <th className="text-center text-nowrap">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Items &&
              Items.map((Item) => (
                <tr key={Item.IdArticulo}>
                  <td>{Item.Nombre}</td>
                  <td className="text-right">{Item.Precio}</td>
                  <td className="text-right">{Item.Stock}</td>
                  <td className="text-right">
                    {moment(Item.FechaAlta).format("DD/MM/YYYY")}
                  </td>
                  <td>{Item.Activo ? "SI" : "NO"}</td>
                  <td className="text-center text-nowrap">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      title="Consultar"
                      onClick={() => Consultar(Item)}
                    >
                      <i className="fa fa-eye"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      title="Modificar"
                      onClick={() => Modificar(Item)}
                    >
                      <i className="fa fa-pencil"></i>
                    </button>
                    <button
                      className={
                        "btn btn-sm " +
                        (Item.Activo
                          ? "btn-outline-danger"
                          : "btn-outline-success")
                      }
                      title={Item.Activo ? "Desactivar" : "Activar"}
                      onClick={() => ActivarDesactivar(Item)}
                    >
                      <i
                        className={"fa fa-" + (Item.Activo ? "times" : "check")}
                      ></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Paginador*/}
        <div className="paginador">
          <div className="row">
            <div className="col">
              <span className="pyBadge">Registros: {RegistrosTotal}</span>
            </div>
            <div className="col text-center">
              Pagina: &nbsp;
              <select
                value={Pagina}
                onChange={(e) => {
                  Buscar(e.target.value);
                }}
              >
                {Paginas?.map((x) => (
                  <option value={x} key={x}>
                    {x}
                  </option>
                ))}
              </select>
              &nbsp; de {Paginas?.length}
            </div>

            <div className="col text-right">
              <button className="btn btn-primary" onClick={() => Imprimir()}>
                <i className="fa fa-print"></i>Imprimir
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };