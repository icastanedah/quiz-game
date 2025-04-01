export type CodeExample = {
  id: string;
  category: 'codeSmell' | 'designPattern';
  name: string;
  code: string;
  hint: string;
  description: string;
};

export const codeExamples: CodeExample[] = [
  // Code Smells
  {
    id: '1',
    category: 'codeSmell',
    name: 'Código duplicado',
    code: `function validarUsuario(usuario) {
  if (usuario.nombre === '') {
    return false;
  }
  if (usuario.email === '') {
    return false;
  }
  if (usuario.contraseña === '') {
    return false;
  }
  return true;
}

function validarProducto(producto) {
  if (producto.nombre === '') {
    return false;
  }
  if (producto.descripcion === '') {
    return false;
  }
  if (producto.precio === '') {
    return false;
  }
  return true;
}`,
    hint: 'Se repite la misma estructura en diferentes funciones',
    description: 'El código duplicado es un "code smell" que ocurre cuando el mismo código se repite en múltiples lugares. Esto hace que el mantenimiento sea más difícil porque los cambios deben hacerse en múltiples lugares.'
  },
  {
    id: '2',
    category: 'codeSmell',
    name: 'Método largo',
    code: `function procesarPedido(pedido) {
  // Validar pedido
  if (!pedido.cliente) {
    return { error: 'Cliente requerido' };
  }
  if (!pedido.productos || pedido.productos.length === 0) {
    return { error: 'El pedido no tiene productos' };
  }
  
  // Calcular total
  let total = 0;
  for (const producto of pedido.productos) {
    if (!producto.precio) {
      return { error: 'Producto sin precio' };
    }
    if (!producto.cantidad) {
      return { error: 'Producto sin cantidad' };
    }
    total += producto.precio * producto.cantidad;
  }
  
  // Aplicar descuentos
  if (pedido.codigoDescuento) {
    if (pedido.codigoDescuento === 'DESCUENTO10') {
      total = total * 0.9;
    } else if (pedido.codigoDescuento === 'DESCUENTO20') {
      total = total * 0.8;
    }
  }
  
  // Calcular impuestos
  const impuestos = total * 0.16;
  total += impuestos;
  
  // Guardar pedido en base de datos
  // Código para guardar en BD...
  
  // Enviar correo de confirmación
  // Código para enviar correo...
  
  return { total, impuestos };
}`,
    hint: 'Esta función hace demasiadas cosas diferentes',
    description: 'Un método largo es un "code smell" que ocurre cuando un método o función tiene demasiadas líneas y realiza múltiples responsabilidades. Esto hace que sea difícil de entender, probar y mantener.'
  },
  // Design Patterns
  {
    id: '3',
    category: 'designPattern',
    name: 'Singleton',
    code: `class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connection: any;
  
  private constructor() {
    // Inicializar conexión a la base de datos
    this.connection = { /* detalles de conexión */ };
  }
  
  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }
  
  public query(sql: string) {
    // Ejecutar consulta en this.connection
    return this.connection.execute(sql);
  }
}

// Uso
const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();
console.log(db1 === db2); // true, es la misma instancia`,
    hint: 'Este patrón asegura que solo exista una instancia de cierta clase',
    description: 'El patrón Singleton garantiza que una clase tenga solo una instancia y proporciona un punto de acceso global a ella. Se utiliza cuando exactamente un objeto debe coordinar acciones en todo el sistema.'
  },
  {
    id: '4',
    category: 'designPattern',
    name: 'Observer',
    code: `interface Observer {
  update(data: any): void;
}

class Subject {
  private observers: Observer[] = [];
  
  public addObserver(observer: Observer): void {
    this.observers.push(observer);
  }
  
  public removeObserver(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }
  
  protected notifyObservers(data: any): void {
    for (const observer of this.observers) {
      observer.update(data);
    }
  }
}

class WeatherStation extends Subject {
  private temperature: number = 0;
  
  public setTemperature(temp: number): void {
    this.temperature = temp;
    this.notifyObservers({ temperature: this.temperature });
  }
}

class Display implements Observer {
  update(data: any): void {
    console.log(\`La temperatura actual es: \${data.temperature}°C\`);
  }
}

// Uso
const weatherStation = new WeatherStation();
const display1 = new Display();
const display2 = new Display();

weatherStation.addObserver(display1);
weatherStation.addObserver(display2);
weatherStation.setTemperature(25); // Ambos displays se actualizarán`,
    hint: 'Este patrón permite a ciertos objetos recibir notificaciones cuando otro objeto cambia',
    description: 'El patrón Observer define una dependencia uno-a-muchos entre objetos, de modo que cuando un objeto cambia de estado, todos sus dependientes son notificados y actualizados automáticamente.'
  },
  {
    id: '5',
    category: 'codeSmell',
    name: 'Clase Dios',
    code: `class SistemaCompleto {
  constructor() {
    this.usuarios = [];
    this.productos = [];
    this.pedidos = [];
    this.pagos = [];
    this.config = {};
  }
  
  agregarUsuario(usuario) { /* ... */ }
  eliminarUsuario(id) { /* ... */ }
  buscarUsuario(id) { /* ... */ }
  
  agregarProducto(producto) { /* ... */ }
  eliminarProducto(id) { /* ... */ }
  buscarProducto(id) { /* ... */ }
  actualizarInventario(id, cantidad) { /* ... */ }
  
  crearPedido(usuario, productos) { /* ... */ }
  cancelarPedido(id) { /* ... */ }
  buscarPedido(id) { /* ... */ }
  
  procesarPago(pedido, metodoPago) { /* ... */ }
  reembolsarPago(id) { /* ... */ }
  
  generarReporteVentas() { /* ... */ }
  generarReporteInventario() { /* ... */ }
  generarReporteUsuarios() { /* ... */ }
  
  configurarSistema(config) { /* ... */ }
  respaldarDatos() { /* ... */ }
  restaurarDatos(backup) { /* ... */ }
  
  // y muchos más métodos...
}`,
    hint: 'Esta clase tiene demasiadas responsabilidades',
    description: 'La "Clase Dios" es un code smell que ocurre cuando una clase sabe o hace demasiado. Estas clases acumulan una cantidad excesiva de atributos y métodos, violando el principio de responsabilidad única.'
  },
  {
    id: '6',
    category: 'designPattern',
    name: 'Factory Method',
    code: `abstract class Documento {
  abstract crear(): void;
  abstract guardar(): void;
}

class DocumentoPDF extends Documento {
  crear(): void {
    console.log('Creando documento PDF');
  }
  
  guardar(): void {
    console.log('Guardando documento PDF');
  }
}

class DocumentoWord extends Documento {
  crear(): void {
    console.log('Creando documento Word');
  }
  
  guardar(): void {
    console.log('Guardando documento Word');
  }
}

abstract class CreadorDocumento {
  abstract crearDocumento(): Documento;
  
  procesarDocumento(): void {
    const documento = this.crearDocumento();
    documento.crear();
    documento.guardar();
  }
}

class CreadorPDF extends CreadorDocumento {
  crearDocumento(): Documento {
    return new DocumentoPDF();
  }
}

class CreadorWord extends CreadorDocumento {
  crearDocumento(): Documento {
    return new DocumentoWord();
  }
}

// Uso
const creadorPDF = new CreadorPDF();
creadorPDF.procesarDocumento();

const creadorWord = new CreadorWord();
creadorWord.procesarDocumento();`,
    hint: 'Este patrón delega la creación de objetos a subclases',
    description: 'El patrón Factory Method define una interfaz para crear un objeto, pero deja que las subclases decidan qué clase instanciar. Permite que una clase delegue la instanciación a subclases.'
  }
]; 