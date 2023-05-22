import { BaseCommand, args, flags } from '@adonisjs/core/build/standalone';
import { join } from 'path';

export default class CreateService extends BaseCommand {
  public static commandName = 'make:service';
  public static description = 'Create a new service file';

  public static settings = {
    loadApp: true,
    stayAlive: false,
  };

  @args.string({ name: 'Filename' })
  public filename: string;

  @flags.boolean()
  public r: boolean = false;

  public async run() {
    this.generator
      .addFile(this.filename, {
        extname: '.ts',
        pattern: 'pascalcase',
        suffix: 'Service',
      })
      .appRoot(this.application.appRoot)
      .destinationDir('app/Services')
      .useMustache()
      .stub(this.r ? join(__dirname, './templates/MakeService.txt') : '')
      .apply({ filename: this.filename });

    await this.generator.run();
  }
}
