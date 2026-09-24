import string
import secrets


def generate_password(
    length,
    use_upper=True,
    use_lower=True,
    use_digits=True,
    use_symbols=True
):
    if length < 4:
        raise ValueError("Password length must be at least 4.")

    character_sets = []

    if use_upper:
        character_sets.append(string.ascii_uppercase)

    if use_lower:
        character_sets.append(string.ascii_lowercase)

    if use_digits:
        character_sets.append(string.digits)

    if use_symbols:
        character_sets.append(string.punctuation)

    if not character_sets:
        raise ValueError(
            "At least one character type must be selected."
        )

    # We cannot guarantee one character from every
    # selected category if the password is too short.
    if length < len(character_sets):
        raise ValueError(
            f"Password length must be at least "
            f"{len(character_sets)} for the selected options."
        )

    # Start with one character from every selected category.
    password_characters = [
        secrets.choice(character_set)
        for character_set in character_sets
    ]

    # Combine all selected character sets.
    all_characters = "".join(character_sets)

    # Fill the remaining positions.
    for _ in range(length - len(password_characters)):
        password_characters.append(
            secrets.choice(all_characters)
        )

    # Shuffle the result so the guaranteed characters
    # aren't always at the beginning.
    secrets.SystemRandom().shuffle(password_characters)

    return "".join(password_characters)