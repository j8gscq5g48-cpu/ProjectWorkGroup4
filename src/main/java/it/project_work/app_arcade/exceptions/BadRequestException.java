package it.project_work.app_arcade.exceptions;

public class BadRequestException extends RuntimeException {

    public final String code;

    public BadRequestException(String code, String message) {
        super(message);
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
