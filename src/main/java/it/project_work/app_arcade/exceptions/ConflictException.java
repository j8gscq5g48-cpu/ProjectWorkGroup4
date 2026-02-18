package it.project_work.app_arcade.exceptions;

public class ConflictException extends RuntimeException {

    public final String code;

    public ConflictException(String code, String message) {
        super(message);
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
