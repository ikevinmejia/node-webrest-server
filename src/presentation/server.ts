import express, { Router } from "express";
import path from "path";

interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

export class Server {
  public readonly app = express();

  private serverListener?: any;

  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, public_path = "public", routes } = options;
    this.port = port;
    this.routes = routes;
    this.publicPath = public_path;
  }

  async start() {
    // Middlewares
    // Funciones que se ejecutan en una ruta
    this.app.use(express.json()); // En raw
    this.app.use(express.urlencoded({ extended: true })); //  x-www-form-urlencode

    // Public Folder

    this.app.use(express.static(this.publicPath));

    // * routes

    this.app.use(this.routes);

    this.app.get("/{*splat}", (req, res) => {
      const indexPath = path.join(
        __dirname,
        `../../${this.publicPath}/index.html`,
      );
      res.sendFile(indexPath);
      return;
    });

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port${this.port}`);
    });
  }
  public close() {
    this.serverListener?.close();
  }
}
