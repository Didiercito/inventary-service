export class GetUnitsUseCase {
  execute() {
    return [
      { key: "kg", label: "Kilogramos" },
      { key: "g", label: "Gramos" },
      { key: "l", label: "Litros" },
      { key: "ml", label: "Mililitros" },
      { key: "pcs", label: "Pieza" },
      { key: "pack", label: "Paquete" },
      { key: "box", label: "Caja" }
    ];
  }
}